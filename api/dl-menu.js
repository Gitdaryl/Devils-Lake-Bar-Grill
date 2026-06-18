import { readBlob } from './lib/dl-blob.js'
import { DEFAULT_MENU } from './lib/dl-defaults.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60')

  const fullMenu = await readBlob('menu', DEFAULT_MENU)

  // Strip inactive items for public view
  const publicMenu = {}
  for (const [cat, sections] of Object.entries(fullMenu)) {
    publicMenu[cat] = {}
    for (const [section, items] of Object.entries(sections)) {
      const active = items.filter(i => i.active !== false)
      if (active.length) publicMenu[cat][section] = active
    }
  }

  res.json(publicMenu)
}
