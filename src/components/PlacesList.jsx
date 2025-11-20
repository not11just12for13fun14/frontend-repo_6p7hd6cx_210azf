import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PlacesList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState({ state: '', city: '', category: '' })

  const fetchPlaces = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (filters.state) params.set('state', filters.state)
      if (filters.city) params.set('city', filters.city)
      if (filters.category) params.set('category', filters.category)
      params.set('limit', '200')
      const res = await fetch(`${API_BASE}/places?${params.toString()}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      setError('Failed to load places')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlaces()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative z-10 max-w-5xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search places..."
            className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            placeholder="State (Bundesland)"
            className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            placeholder="City"
            className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <input
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              placeholder="Category"
              className="flex-1 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={fetchPlaces} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Search</button>
          </div>
        </div>
      </div>

      {loading && <p className="text-blue-200">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <a key={p.id} href={p.website || '#'} target="_blank" rel="noreferrer" className="group block bg-slate-800/50 border border-blue-500/20 rounded-xl p-5 hover:border-blue-400/50 transition">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-white font-semibold text-lg group-hover:text-blue-300">{p.name}</h3>
              {p.category && <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-200 border border-blue-500/30">{p.category}</span>}
            </div>
            <p className="text-blue-200/80 text-sm mt-2 line-clamp-3">{p.description || 'No description provided.'}</p>
            <div className="text-blue-300/70 text-sm mt-3">
              {[p.city, p.state].filter(Boolean).join(', ')}
            </div>
            {p.tags?.length ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {p.tags.slice(0,6).map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700 text-blue-200/80">#{t}</span>
                ))}
              </div>
            ) : null}
          </a>
        ))}
      </div>

      {!loading && !items.length && (
        <div className="text-blue-200/80 text-center mt-8">No places found. Try another search.</div>
      )}
    </div>
  )
}
