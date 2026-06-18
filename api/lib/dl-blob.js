import { put, list, del } from '@vercel/blob'

export async function readBlob(key, fallback = null) {
  try {
    const { blobs } = await list({ prefix: `dl-${key}-` })
    if (!blobs.length) return fallback
    const latest = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0]
    const r = await fetch(latest.url, { headers: { 'Cache-Control': 'no-store' } })
    return await r.json()
  } catch {
    return fallback
  }
}

export async function writeBlob(key, data) {
  const { blobs } = await list({ prefix: `dl-${key}-` })
  const oldUrls = blobs.map(b => b.url)
  await put(`dl-${key}-${Date.now()}.json`, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: true,
  })
  if (oldUrls.length) await del(oldUrls)
}

export async function appendAudit(entry) {
  const current = (await readBlob('audit', [])).slice(-49)
  await writeBlob('audit', [...current, entry])
}
