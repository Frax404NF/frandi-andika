const STAT_ITEMS = [
  { label: 'Total', key: 'total', color: 'text-slate-950' },
  { label: 'Todo', key: 'todo', color: 'text-blue-600' },
  { label: 'In Progress', key: 'in_progress', color: 'text-violet-600' },
  { label: 'Done', key: 'done', color: 'text-emerald-600' },
]

export function StatsCard({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-100 gap-px">
      {STAT_ITEMS.map(({ label, key, color }) => (
        <div key={key} className="bg-white px-4 py-3.5">
          <span className={`block text-2xl font-bold tracking-tight leading-tight ${color}`}>
            {stats ? stats[key] : '\u2014'}
          </span>
          <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-[0.05em] mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
