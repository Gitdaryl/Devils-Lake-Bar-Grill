const DB_ID = process.env.NOTION_DB_DL_MENU
const TOKEN = process.env.NOTION_TOKEN_DL

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')

  try {
    const pages = await queryAll(DB_ID, TOKEN, {
      filter: { property: 'Active', checkbox: { equals: true } },
      sorts: [{ property: 'SortOrder', direction: 'ascending' }],
    })

    // Group into { category: { section: [items] } }
    const grouped = {}
    for (const p of pages) {
      const props = p.properties
      const category = props.Category?.select?.name || 'other'
      const section  = props.Section?.rich_text?.[0]?.plain_text || ''
      const name     = props.Name?.title?.[0]?.plain_text || ''
      const price    = props.Price?.rich_text?.[0]?.plain_text || ''
      const desc     = props.Description?.rich_text?.[0]?.plain_text || ''
      if (!name) continue
      if (!grouped[category]) grouped[category] = {}
      if (!grouped[category][section]) grouped[category][section] = []
      grouped[category][section].push({ name, price, desc })
    }

    res.json(grouped)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

async function queryAll(dbId, token, body) {
  const url = `https://api.notion.com/v1/databases/${dbId}/query`
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28',
  }
  let results = []
  let cursor
  do {
    const pageBody = cursor ? { ...body, start_cursor: cursor } : body
    const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(pageBody) })
    if (!r.ok) throw new Error(`Notion query failed: ${await r.text()}`)
    const d = await r.json()
    results = results.concat(d.results)
    cursor = d.has_more ? d.next_cursor : null
  } while (cursor)
  return results
}
