const DB_ID = process.env.NOTION_DB_DL_MUSIC
const TOKEN = process.env.NOTION_TOKEN_DL

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')

  try {
    const today = new Date().toISOString().split('T')[0]

    const url = `https://api.notion.com/v1/databases/${DB_ID}/query`
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    }
    const r = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        filter: {
          and: [
            { property: 'Active', checkbox: { equals: true } },
            { property: 'Date', date: { on_or_after: today } },
          ],
        },
        sorts: [{ property: 'Date', direction: 'ascending' }],
      }),
    })
    if (!r.ok) throw new Error(`Notion query failed: ${await r.text()}`)
    const data = await r.json()

    const events = data.results.map(p => ({
      date:   p.properties.Date?.date?.start || '',
      artist: p.properties.Artist?.title?.[0]?.plain_text || '',
      time:   p.properties.Notes?.rich_text?.[0]?.plain_text || '',
    })).filter(e => e.date && e.artist)

    res.json(events)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
