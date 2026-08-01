import { TaskCard } from '@/components/task/TaskCard'
import { motion, AnimatePresence } from 'framer-motion'

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

  return (
    <div className="flex flex-col gap-2.5 min-h-[120px]">
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 ? (
          <motion.div
            key="empty"
            layout="position"
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 400, damping: 30, opacity: { duration: 0.2 } }}
          >
            <EmptyState filter={filter} />
          </motion.div>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              layout="position"
              className="w-full origin-top"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
                opacity: { duration: 0.2 }
              }}
            >
              <TaskCard
                task={task}
                onEdit={() => onEdit(task)}
                onDelete={() => onDelete(task.id)}
                onStatusChange={(status) => onStatusChange(task.id, status)}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  )
}
