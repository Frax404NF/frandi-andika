import { STATUS_STYLES } from '@/lib/constants'

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? {}
  return (
    <span
      className="inline-block text-xs font-semibold rounded-full px-2.5 py-0.5 whitespace-nowrap shrink-0 leading-5"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {status}
    </span>
  )
}
