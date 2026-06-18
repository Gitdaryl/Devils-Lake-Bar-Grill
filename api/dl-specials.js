import { readBlob } from './lib/dl-blob.js'
import { DEFAULT_SPECIALS } from './lib/dl-defaults.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')
  res.json(await readBlob('specials', DEFAULT_SPECIALS))
}
