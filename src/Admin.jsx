import { useState, useEffect, useCallback } from 'react'

// ─── AUTH HELPERS ─────────────────────────────────────────────────────────────

function getSession() {
  try { return JSON.parse(localStorage.getItem('dl_admin_session') || 'null') } catch { return null }
}
function setSession(s) { localStorage.setItem('dl_admin_session', JSON.stringify(s)) }
function clearSession() { localStorage.removeItem('dl_admin_session') }

async function authFetch(url, options = {}) {
  const s = getSession()
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: s ? `Bearer ${s.token}` : '',
      ...(options.headers || {}),
    },
  })
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CATEGORIES = ['breakfast', 'tacos', 'steaks', 'cocktails']
const CAT_LABELS = { breakfast: 'Breakfast', tacos: 'Tacos', steaks: 'Steaks', cocktails: 'Cocktails' }
const CAT_ICONS  = { breakfast: '☀️', tacos: '🌮', steaks: '🥩', cocktails: '🍹' }
const DAYS_LABELS = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' }
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS_S = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function fmtDate(str) {
  const d = new Date(str + 'T12:00:00')
  return `${DAYS_S[d.getDay()]} ${MONTHS[d.getMonth()]} ${d.getDate()}`
}
function fmtTs(ts) {
  const d = new Date(ts)
  return `${MONTHS[d.getMonth()]} ${d.getDate()} at ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [name, setName] = useState('')
  const [pin,  setPin]  = useState('')
  const [err,  setErr]  = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!name.trim() || pin.length < 4) return setErr('Enter your name and 4-digit PIN')
    setBusy(true); setErr('')
    const r = await fetch('/api/dl-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), pin }),
    })
    const d = await r.json()
    setBusy(false)
    if (!r.ok) return setErr(d.error || 'Invalid name or PIN')
    const session = { staff: d.staff, token: d.token }
    setSession(session)
    onLogin(session)
  }

  return (
    <div className="min-h-screen bg-lake-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/dl_bargrill_logo.png" alt="Devils Lake Bar and Grill" className="w-20 h-20 mx-auto mb-4 rounded-full" />
          <h1 className="text-lake-cream font-serif text-2xl font-bold">Staff Access</h1>
          <p className="text-lake-chalk/50 text-sm mt-1">Devils Lake Bar &amp; Grill</p>
        </div>
        <form onSubmit={submit} className="bg-lake-navy rounded-2xl p-6 border border-lake-chalk/10 space-y-4">
          <div>
            <label className="block text-lake-chalk/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">Your Name</label>
            <input
              value={name} onChange={e => setName(e.target.value)}
              placeholder="e.g. Sarah"
              className="w-full bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2.5
                text-lake-cream placeholder-lake-chalk/30 text-sm focus:outline-none focus:border-lake-gold"
            />
          </div>
          <div>
            <label className="block text-lake-chalk/70 text-xs font-semibold mb-1.5 uppercase tracking-wide">PIN</label>
            <input
              type="password" inputMode="numeric" maxLength={4}
              value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="4-digit PIN"
              className="w-full bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2.5
                text-lake-cream placeholder-lake-chalk/30 text-sm focus:outline-none focus:border-lake-gold
                tracking-widest text-center text-lg"
            />
          </div>
          {err && <p className="text-red-400 text-sm text-center">{err}</p>}
          <button type="submit" disabled={busy}
            className="w-full bg-lake-blue text-white font-semibold py-3 rounded-lg
              hover:bg-blue-600 transition-colors disabled:opacity-50">
            {busy ? 'Checking...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── MUSIC TAB ────────────────────────────────────────────────────────────────

function MusicTab({ events, onSave, saving }) {
  const [list, setList]   = useState(events)
  const [form, setForm]   = useState({ date: '', artist: '', time: '' })
  const [adding, setAdding] = useState(false)

  useEffect(() => setList(events), [events])

  const today = new Date().toISOString().split('T')[0]
  const upcoming = list.filter(e => e.active !== false && e.date >= today).sort((a, b) => a.date.localeCompare(b.date))
  const past     = list.filter(e => e.active !== false && e.date < today).sort((a, b) => b.date.localeCompare(a.date))
  const inactive = list.filter(e => e.active === false)

  function toggleActive(id, val) {
    const next = list.map(e => e.id === id ? { ...e, active: val } : e)
    setList(next)
    onSave('events', next, `${val ? 'Restored' : 'Removed'} show: ${list.find(e => e.id === id)?.artist}`)
  }

  function addShow() {
    if (!form.date || !form.artist.trim()) return
    const next = [...list, { id: String(Date.now()), ...form, artist: form.artist.trim(), active: true }]
    setList(next)
    onSave('events', next, `Added show: ${form.artist.trim()} on ${form.date}`)
    setForm({ date: '', artist: '', time: '' })
    setAdding(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lake-cream font-serif text-xl font-bold">Live Music Schedule</h2>
        <button onClick={() => setAdding(!adding)}
          className="bg-lake-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          + Add Show
        </button>
      </div>

      {adding && (
        <div className="bg-lake-navy rounded-xl p-4 border border-lake-gold/30 space-y-3">
          <p className="text-lake-gold text-sm font-semibold">New Show</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream text-sm focus:outline-none focus:border-lake-gold" />
            <input placeholder="Artist name" value={form.artist} onChange={e => setForm(f => ({ ...f, artist: e.target.value }))}
              className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream placeholder-lake-chalk/30 text-sm focus:outline-none focus:border-lake-gold" />
            <input placeholder="Time (e.g. 7-10pm)" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream placeholder-lake-chalk/30 text-sm focus:outline-none focus:border-lake-gold" />
          </div>
          <div className="flex gap-2">
            <button onClick={addShow} disabled={saving}
              className="bg-lake-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Show'}
            </button>
            <button onClick={() => setAdding(false)} className="text-lake-chalk/50 text-sm px-3 py-2 hover:text-lake-chalk transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {upcoming.length > 0 && (
        <div>
          <p className="text-lake-chalk/50 text-xs uppercase tracking-wide font-semibold mb-2">Upcoming</p>
          <div className="space-y-2">
            {upcoming.map(e => (
              <ShowRow key={e.id} event={e} onRemove={() => toggleActive(e.id, false)} />
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <details>
          <summary className="text-lake-chalk/40 text-sm cursor-pointer hover:text-lake-chalk/70 transition-colors list-none">
            {past.length} past show{past.length !== 1 ? 's' : ''} this season
          </summary>
          <div className="mt-2 space-y-2 opacity-50">
            {past.map(e => <ShowRow key={e.id} event={e} past />)}
          </div>
        </details>
      )}

      {inactive.length > 0 && (
        <details>
          <summary className="text-red-400/50 text-xs cursor-pointer hover:text-red-400/80 transition-colors list-none">
            {inactive.length} removed show{inactive.length !== 1 ? 's' : ''} (click to restore)
          </summary>
          <div className="mt-2 space-y-2">
            {inactive.map(e => (
              <div key={e.id} className="flex items-center gap-3 bg-lake-navy/40 rounded-xl px-4 py-3 border border-red-500/10 opacity-60">
                <div className="flex-1 min-w-0">
                  <p className="text-lake-cream/50 text-sm line-through truncate">{e.artist}</p>
                  <p className="text-lake-chalk/30 text-xs">{fmtDate(e.date)}</p>
                </div>
                <button onClick={() => toggleActive(e.id, true)}
                  className="text-lake-gold text-xs font-semibold px-3 py-1 border border-lake-gold/30 rounded-lg hover:bg-lake-gold/10 transition-colors">
                  Restore
                </button>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}

function ShowRow({ event: e, onRemove, past }) {
  return (
    <div className="flex items-center gap-3 bg-lake-navy/60 rounded-xl px-4 py-3 border border-lake-chalk/10">
      <div className="flex-1 min-w-0">
        <p className="text-lake-cream font-semibold text-sm truncate">{e.artist}</p>
        <p className="text-lake-chalk/50 text-xs">{fmtDate(e.date)}{e.time ? ` · ${e.time}` : ''}</p>
      </div>
      {!past && onRemove && (
        <button onClick={onRemove}
          className="text-red-400/60 text-xs font-semibold px-3 py-1 border border-red-500/20 rounded-lg
            hover:bg-red-500/10 hover:text-red-400 transition-colors">
          Remove
        </button>
      )}
    </div>
  )
}

// ─── MENU TAB ─────────────────────────────────────────────────────────────────

function MenuTab({ menu, onSave, saving }) {
  const [data, setData]     = useState(menu)
  const [cat, setCat]       = useState('breakfast')
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [adding, setAdding]   = useState(null)
  const [addForm, setAddForm] = useState({ section: '', name: '', price: '', desc: '' })

  useEffect(() => setData(menu), [menu])

  const sections = data[cat] || {}
  const sectionNames = Object.keys(sections)

  function saveData(next, summary) {
    setData(next)
    onSave('menu', next, summary)
  }

  function toggleItem(section, idx, val) {
    const next = { ...data, [cat]: { ...data[cat], [section]: data[cat][section].map((it, i) => i === idx ? { ...it, active: val } : it) } }
    saveData(next, `${val ? 'Enabled' : 'Disabled'} item: ${data[cat][section][idx].name}`)
  }

  function startEdit(section, idx) {
    const item = data[cat][section][idx]
    setEditing(`${section}:${idx}`)
    setEditForm({ name: item.name, price: item.price, desc: item.desc })
  }

  function saveEdit(section, idx) {
    const next = { ...data, [cat]: { ...data[cat], [section]: data[cat][section].map((it, i) => i === idx ? { ...it, ...editForm } : it) } }
    saveData(next, `Updated item: ${editForm.name}`)
    setEditing(null)
  }

  function addItem() {
    if (!addForm.section || !addForm.name.trim()) return
    const section = addForm.section
    const newItem = { name: addForm.name.trim(), price: addForm.price, desc: addForm.desc, active: true }
    const existing = data[cat][section] || []
    const next = { ...data, [cat]: { ...data[cat], [section]: [...existing, newItem] } }
    saveData(next, `Added item: ${newItem.name} to ${section}`)
    setAdding(null)
    setAddForm({ section: '', name: '', price: '', desc: '' })
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(k => (
            <button key={k} onClick={() => setCat(k)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all
                ${cat === k ? 'bg-lake-blue text-white border-lake-blue' : 'bg-lake-navy/40 text-lake-chalk/70 border-lake-chalk/15 hover:border-lake-chalk/40'}`}>
              {CAT_ICONS[k]} {CAT_LABELS[k]}
            </button>
          ))}
        </div>
        <button onClick={() => { setAdding(true); setAddForm({ section: sectionNames[0] || '', name: '', price: '', desc: '' }) }}
          className="bg-lake-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          + Add Item
        </button>
      </div>

      {adding && (
        <div className="bg-lake-navy rounded-xl p-4 border border-lake-gold/30 space-y-3">
          <p className="text-lake-gold text-sm font-semibold">New Menu Item - {CAT_LABELS[cat]}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select value={addForm.section} onChange={e => setAddForm(f => ({ ...f, section: e.target.value }))}
              className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream text-sm focus:outline-none focus:border-lake-gold">
              {sectionNames.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <input placeholder="Item name" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))}
              className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream placeholder-lake-chalk/30 text-sm focus:outline-none focus:border-lake-gold" />
            <input placeholder="Price (e.g. $12.99)" value={addForm.price} onChange={e => setAddForm(f => ({ ...f, price: e.target.value }))}
              className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream placeholder-lake-chalk/30 text-sm focus:outline-none focus:border-lake-gold" />
            <input placeholder="Description (optional)" value={addForm.desc} onChange={e => setAddForm(f => ({ ...f, desc: e.target.value }))}
              className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream placeholder-lake-chalk/30 text-sm focus:outline-none focus:border-lake-gold" />
          </div>
          <div className="flex gap-2">
            <button onClick={addItem} disabled={saving}
              className="bg-lake-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Add Item'}
            </button>
            <button onClick={() => setAdding(null)} className="text-lake-chalk/50 text-sm px-3 py-2 hover:text-lake-chalk transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {sectionNames.map(section => (
        <div key={section} className="bg-lake-navy/50 rounded-xl border border-lake-chalk/10 overflow-hidden">
          <div className="px-4 py-3 bg-lake-navy/80 border-b border-lake-chalk/10">
            <p className="text-lake-chalk text-sm font-semibold">{section}</p>
          </div>
          <div className="divide-y divide-lake-chalk/5">
            {(sections[section] || []).map((item, idx) => {
              const key = `${section}:${idx}`
              const isEditing = editing === key
              return (
                <div key={idx} className={`px-4 py-3 ${item.active === false ? 'opacity-40' : ''}`}>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                          className="bg-lake-dark border border-lake-gold/30 rounded-lg px-2 py-1.5 text-lake-cream text-sm focus:outline-none" placeholder="Name" />
                        <input value={editForm.price} onChange={e => setEditForm(f => ({ ...f, price: e.target.value }))}
                          className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-2 py-1.5 text-lake-cream text-sm focus:outline-none" placeholder="Price" />
                      </div>
                      <input value={editForm.desc} onChange={e => setEditForm(f => ({ ...f, desc: e.target.value }))}
                        className="w-full bg-lake-dark border border-lake-chalk/15 rounded-lg px-2 py-1.5 text-lake-cream text-sm focus:outline-none" placeholder="Description" />
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(section, idx)} disabled={saving}
                          className="bg-lake-blue text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button onClick={() => setEditing(null)} className="text-lake-chalk/50 text-xs px-2 hover:text-lake-chalk transition-colors">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleItem(section, idx, item.active === false)}
                        className={`w-9 h-5 rounded-full transition-colors shrink-0 relative
                          ${item.active !== false ? 'bg-lake-blue' : 'bg-lake-chalk/20'}`}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all
                          ${item.active !== false ? 'left-4' : 'left-0.5'}`} />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${item.active === false ? 'text-lake-chalk/40 line-through' : 'text-lake-cream'}`}>
                          {item.name}
                          {item.price && <span className="text-lake-gold ml-2">{item.price}</span>}
                        </p>
                        {item.desc && <p className="text-lake-chalk/40 text-xs truncate mt-0.5">{item.desc}</p>}
                      </div>
                      <button onClick={() => startEdit(section, idx)}
                        className="text-lake-chalk/40 text-xs px-2 py-1 hover:text-lake-gold transition-colors shrink-0">
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── SPECIALS TAB ─────────────────────────────────────────────────────────────

function SpecialsTab({ specials, onSave, saving }) {
  const [data, setData] = useState(specials)

  useEffect(() => setData(specials), [specials])

  function updateField(idx, field, val) {
    setData(d => d.map((s, i) => i === idx ? { ...s, [field]: val } : s))
  }

  function saveAll() {
    onSave('specials', data, 'Updated weekly specials')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lake-cream font-serif text-xl font-bold">Weekly Specials</h2>
        <button onClick={saveAll} disabled={saving}
          className="bg-lake-blue text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>
      <p className="text-lake-chalk/40 text-xs">Edit any field and click Save All when done.</p>

      <div className="space-y-3">
        {data.map((s, idx) => (
          <div key={s.day} className="bg-lake-navy/50 rounded-xl p-4 border border-lake-chalk/10">
            <div className="flex items-center gap-3 mb-3">
              <input value={s.icon} onChange={e => updateField(idx, 'icon', e.target.value)}
                className="bg-lake-dark border border-lake-chalk/15 rounded-lg px-2 py-1 text-center text-xl w-12 focus:outline-none focus:border-lake-gold" />
              <div>
                <p className="text-lake-chalk/50 text-xs">{DAYS_LABELS[s.day]}</p>
                <input value={s.label} onChange={e => updateField(idx, 'label', e.target.value)}
                  className="bg-transparent text-lake-cream font-bold text-sm focus:outline-none border-b border-transparent focus:border-lake-gold" />
              </div>
            </div>
            <input value={s.desc} onChange={e => updateField(idx, 'desc', e.target.value)}
              className="w-full bg-lake-dark border border-lake-chalk/15 rounded-lg px-3 py-2 text-lake-cream/80 text-sm focus:outline-none focus:border-lake-gold"
              placeholder="Description shown on site..." />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── AUDIT LOG ────────────────────────────────────────────────────────────────

function AuditLog({ entries }) {
  if (!entries.length) return (
    <p className="text-lake-chalk/30 text-sm text-center py-4">No edits yet this session.</p>
  )
  const icons = { menu: '🍽', events: '🎸', specials: '⭐' }
  return (
    <div className="space-y-1.5">
      {[...entries].reverse().slice(0, 20).map((e, i) => (
        <div key={i} className="flex items-start gap-2 text-xs text-lake-chalk/50 py-1 border-b border-lake-chalk/5">
          <span>{icons[e.section] || '•'}</span>
          <span className="text-lake-chalk font-semibold">{e.staff}</span>
          <span className="flex-1">{e.summary}</span>
          <span className="shrink-0 text-lake-chalk/30">{fmtTs(e.ts)}</span>
        </div>
      ))}
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

function Dashboard({ session, onLogout }) {
  const [tab, setTab]     = useState('music')
  const [data, setData]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg]     = useState('')

  const loadData = useCallback(async () => {
    const r = await authFetch('/api/dl-data', { method: 'POST' })
    if (!r.ok) { onLogout(); return }
    setData(await r.json())
  }, [onLogout])

  useEffect(() => { loadData() }, [loadData])

  async function handleSave(section, payload, summary) {
    setSaving(true); setMsg('')
    const r = await authFetch('/api/dl-save', {
      method: 'POST',
      body: JSON.stringify({ section, data: payload, summary }),
    })
    setSaving(false)
    if (!r.ok) { setMsg('Save failed - please try again'); return }
    setMsg('Saved!')
    setTimeout(() => setMsg(''), 2000)
    await loadData()
  }

  const tabs = [
    { id: 'music',    label: '🎸 Music' },
    { id: 'menu',     label: '🍽 Menu' },
    { id: 'specials', label: '⭐ Specials' },
    { id: 'audit',    label: '📋 History' },
  ]

  return (
    <div className="min-h-screen bg-lake-dark">
      {/* Header */}
      <div className="bg-lake-navy border-b border-lake-chalk/10 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/dl_bargrill_logo.png" alt="" className="w-7 h-7 rounded-full" />
            <span className="text-lake-gold font-serif font-bold text-sm hidden sm:block">DL Bar &amp; Grill Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {msg && <span className={`text-xs font-semibold ${msg.includes('fail') ? 'text-red-400' : 'text-green-400'}`}>{msg}</span>}
            {saving && <span className="text-lake-chalk/50 text-xs">Saving...</span>}
            <span className="text-lake-chalk/50 text-xs hidden sm:block">Staff: <span className="text-lake-cream font-semibold">{session.staff}</span></span>
            <button onClick={onLogout} className="text-lake-chalk/40 text-xs hover:text-red-400 transition-colors px-2 py-1 border border-lake-chalk/10 rounded-lg">
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-lake-chalk/10 bg-lake-navy/50">
        <div className="max-w-4xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors
                ${tab === t.id ? 'border-lake-gold text-lake-gold' : 'border-transparent text-lake-chalk/50 hover:text-lake-chalk/80'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {!data ? (
          <div className="text-center py-20 text-lake-chalk/40">Loading...</div>
        ) : (
          <>
            {tab === 'music'    && <MusicTab    events={data.events}   onSave={handleSave} saving={saving} />}
            {tab === 'menu'     && <MenuTab     menu={data.menu}       onSave={handleSave} saving={saving} />}
            {tab === 'specials' && <SpecialsTab specials={data.specials} onSave={handleSave} saving={saving} />}
            {tab === 'audit'    && (
              <div>
                <h2 className="text-lake-cream font-serif text-xl font-bold mb-4">Edit History</h2>
                <AuditLog entries={data.audit} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ─── ADMIN APP ────────────────────────────────────────────────────────────────

export default function AdminApp() {
  const [session, setSession] = useState(getSession)

  function handleLogin(s) { setSession(s) }
  function handleLogout() { clearSession(); setSession(null) }

  if (!session) return <LoginScreen onLogin={handleLogin} />
  return <Dashboard session={session} onLogout={handleLogout} />
}
