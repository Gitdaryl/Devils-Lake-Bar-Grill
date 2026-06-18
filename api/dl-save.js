import { createHmac } from 'crypto'
import { writeBlob, appendAudit } from './lib/dl-blob.js'
import { syncEventsToNotion } from './lib/dl-notion-sync.js'

function validateToken(authHeader) {
  try {
    const token = (authHeader || '').replace('Bearer ', '')
    const decoded = Buffer.from(token, 'base64').toString()
    const [name, expiry, sig] = decoded.split(':')
    if (Date.now() > Number(expiry)) return null
    const secret = process.env.DL_ADMIN_SECRET
    const expected = createHmac('sha256', secret).update(`${name}:${expiry}`).digest('hex').slice(0, 24)
    return sig === expected ? name : null
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const staff = validateToken(req.headers.authorization)
  if (!staff) return res.status(401).json({ error: 'Unauthorized' })

  const { section, data, summary } = req.body || {}
  const allowed = ['menu', 'events', 'specials']
  if (!allowed.includes(section)) return res.status(400).json({ error: 'Invalid section' })
  if (!data) return res.status(400).json({ error: 'No data provided' })

  // For events, sync to MB Notion (attaches notionPageId to each event so future edits update in place)
  const saveData = section === 'events' ? await syncEventsToNotion(data) : data

  await writeBlob(section, saveData)
  await appendAudit({
    ts: new Date().toISOString(),
    staff,
    section,
    summary: summary || `Updated ${section}`,
  })

  res.json({ ok: true })
}
