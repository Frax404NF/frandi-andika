import { FILTER_OPTIONS } from '@/lib/constants'

const COUNT_MAP = {
  All: 'all',
  Todo: 'todo',
  'In Progress': 'inProgress',
  Done: 'done',
}

const INACTIVE =
  'flex items-center justify-between gap-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-md px-3.5 py-1.5 cursor-pointer transition-colors duration-150 hover:bg-slate-50 hover:border-slate-300'

const ACTIVE =
  'flex items-center justify-between gap-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded-md px-3.5 py-1.5 cursor-pointer transition-colors duration-150 hover:bg-indigo-700 hover:border-indigo-700'

export function FilterBar({ filter, counts, onFilter }) {
  return (
    <div
      className="grid grid-cols-2 gap-2 min-[480px]:flex min-[480px]:flex-wrap"
      role="group"
      aria-label="Filter tasks by status"
    >
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={filter === option ? ACTIVE : INACTIVE}
          onClick={() => onFilter(option)}
          aria-pressed={filter === option}
        >
          <span>{option === 'All' ? 'Semua' : option}</span>
          <span
            className={`text-xs font-semibold rounded-full px-1.5 min-w-[18px] text-center leading-[1.6] ${
              filter === option ? 'bg-white/20' : 'bg-black/[0.08]'
            }`}
          >
            {counts[COUNT_MAP[option]]}
          </span>
        </button>
      ))}
    </div>
  )
}
