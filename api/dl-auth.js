import { createHmac } from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, pin } = req.body || {}
  if (!name || !pin) return res.status(400).json({ error: 'Name and PIN required' })

  const staffList = JSON.parse(process.env.DL_STAFF_PINS || '[]')
  const staff = staffList.find(
    s => s.name.toLowerCase() === name.trim().toLowerCase() && String(s.pin) === String(pin)
  )
  if (!staff) return res.status(401).json({ error: 'Invalid name or PIN' })

  const secret = process.env.DL_ADMIN_SECRET
  const expiry = Date.now() + 8 * 60 * 60 * 1000
  const payload = `${staff.name}:${expiry}`
  const sig = createHmac('sha256', secret).update(payload).digest('hex').slice(0, 24)
  const token = Buffer.from(`${payload}:${sig}`).toString('base64')

  res.json({ ok: true, staff: staff.name, token })
}
