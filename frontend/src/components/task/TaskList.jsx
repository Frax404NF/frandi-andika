import { TaskCard } from '@/components/task/TaskCard'

function Skeleton() {
  return (
    <div className="flex flex-col gap-2.5">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[96px] rounded-xl skeleton-shimmer"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function EmptyState({ filter }) {
  const message =
    filter === 'All'
      ? 'Belum ada tugas. Tambahkan di atas.'
      : `Tidak ada tugas ${filter}.`
  return (
    <div className="bg-white border border-slate-200 rounded-xl py-12 px-6 text-center">
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  )
}

export function TaskList({ tasks, filter, loading, onEdit, onDelete, onStatusChange }) {
  if (loading) return <Skeleton />
  if (tasks.length === 0) return <EmptyState filter={filter} />

  return (
    <div className="flex flex-col gap-2.5">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onStatusChange={(status) => onStatusChange(task.id, status)}
        />
      ))}
    </div>
  )
}
