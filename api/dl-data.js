import { createHmac } from 'crypto'
import { readBlob } from './lib/dl-blob.js'
import { DEFAULT_MENU, DEFAULT_EVENTS, DEFAULT_SPECIALS } from './lib/dl-defaults.js'

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

  const [menu, events, specials, audit] = await Promise.all([
    readBlob('menu', DEFAULT_MENU),
    readBlob('events', DEFAULT_EVENTS),
    readBlob('specials', DEFAULT_SPECIALS),
    readBlob('audit', []),
  ])

  res.json({ menu, events, specials, audit })
}
