import { readBlob } from './lib/dl-blob.js'
import { DEFAULT_EVENTS } from './lib/dl-defaults.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')

  const today = new Date().toISOString().split('T')[0]
  const events = await readBlob('events', DEFAULT_EVENTS)

  res.json(
    events
      .filter(e => e.active !== false && e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
  )
}
