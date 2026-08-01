import { STATUS_OPTIONS, STATUS_STYLES, STATUS_ACCENT } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

function formatDate(isoString) {
  return new Date(isoString + 'Z').toLocaleString()
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const accentColor = STATUS_ACCENT[task.status] ?? 'bg-slate-300'
  const badgeStyle = STATUS_STYLES[task.status] ?? {}

  return (
    <article className="relative bg-white border border-slate-200 rounded-xl pl-5 pr-4 py-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full ${accentColor}`} />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-semibold text-slate-950 leading-snug break-words min-w-0">
          {task.title}
        </h3>

        <select
          className="text-xs font-semibold rounded-full px-2.5 py-0.5 whitespace-nowrap shrink-0 leading-5 border-0 outline-none cursor-pointer appearance-none pr-5 bg-no-repeat"
          style={{
            backgroundColor: badgeStyle.bg,
            color: badgeStyle.color,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='currentColor' opacity='.6' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
            backgroundPosition: 'right 6px center',
          }}
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Change task status"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {task.description && (
        <p className="text-sm text-slate-600 leading-relaxed break-words -mt-1">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2.5">
        <time className="text-[11px] text-slate-400 tabular-nums" dateTime={task.created_at}>
          {formatDate(task.created_at)}
        </time>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            Hapus
          </Button>
        </div>
      </div>
    </article>
  )
}
