const NOTION_VERSION = '2022-06-28'
const LOCATION = 'Devils Lake Bar & Grill, 6365 US-223, Addison, MI 49220'
const EVENT_URL = 'https://devils-lake-bar-grill.vercel.app'
const CONTACT_EMAIL = 'admin@yetigroove.com'

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_TOKEN_EVENTS}`,
    'Content-Type': 'application/json',
    'Notion-Version': NOTION_VERSION,
  }
}

function buildProperties(event) {
  const artistName = event.artist || 'Live Music'
  const title = `${artistName} — Live at Devils Lake Bar & Grill`
  const props = {
    'Event Name': { title: [{ text: { content: title } }] },
    'Category':   { rich_text: [{ text: { content: 'Live Music' } }] },
    'Status':     { status: { name: 'Published' } },
    'Email':      { email: CONTACT_EMAIL },
    'Location':   { rich_text: [{ text: { content: LOCATION } }] },
    'Event URL':  { url: EVENT_URL },
    'Description': { rich_text: [{ text: { content: `Live music at Devils Lake Bar & Grill. ${event.time ? `Show time: ${event.time}.` : ''}`.trim() } }] },
  }
  if (event.date) props['Event date'] = { date: { start: event.date } }
  if (event.time) props['Time'] = { rich_text: [{ text: { content: event.time } }] }
  return props
}

async function createNotionEvent(event) {
  const r = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DB_EVENTS },
      properties: buildProperties(event),
    }),
  })
  if (!r.ok) {
    const err = await r.text()
    console.error('Notion create failed:', err)
    return null
  }
  const data = await r.json()
  return data.id
}

async function updateNotionEvent(pageId, event) {
  const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ properties: buildProperties(event) }),
  })
  if (!r.ok) console.error('Notion update failed:', await r.text())
}

async function archiveNotionEvent(pageId) {
  const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ archived: true }),
  })
  if (!r.ok) console.error('Notion archive failed:', await r.text())
}

// Syncs the DL events array to MB Notion. Mutates each event in place with notionPageId.
// Returns the updated events array (with pageIds attached).
export async function syncEventsToNotion(events) {
  if (!process.env.NOTION_TOKEN_EVENTS || !process.env.NOTION_DB_EVENTS) {
    console.warn('Notion sync skipped: missing NOTION_TOKEN_EVENTS or NOTION_DB_EVENTS')
    return events
  }

  const today = new Date().toISOString().split('T')[0]
  const updated = await Promise.all(
    events.map(async event => {
      const isUpcoming = event.date >= today
      const isActive = event.active !== false

      if (isActive && isUpcoming) {
        if (event.notionPageId) {
          // Update existing Notion page
          await updateNotionEvent(event.notionPageId, event)
          return event
        } else {
          // Create new Notion page
          const pageId = await createNotionEvent(event)
          return pageId ? { ...event, notionPageId: pageId } : event
        }
      } else if (!isActive && event.notionPageId) {
        // Archive removed shows from MB
        await archiveNotionEvent(event.notionPageId)
        return event
      }
      return event
    })
  )
  return updated
}
