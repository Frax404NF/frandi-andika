import { useTasks } from '@/hooks/useTasks'
import { Header } from '@/components/layout/Header'
import { StatsCard } from '@/components/layout/StatsCard'
import { TaskForm } from '@/components/task/TaskForm'
import { FilterBar } from '@/components/task/FilterBar'
import { TaskList } from '@/components/task/TaskList'
import { EditModal } from '@/components/task/EditModal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Toast } from '@/components/ui/Toast'

export default function App() {
  const {
    stats,
    filter,
    filteredTasks,
    counts,
    editingTask,
    confirmTarget,
    toasts,
    loading,
    setFilter,
    setEditingTask,
    setConfirmTarget,
    addTask,
    editTask,
    deleteTask,
    changeStatus,
    removeToast,
  } = useTasks()

  return (
    <div className="min-h-screen bg-slate-100 pb-12 font-sans">
      <Toast toasts={toasts} onRemove={removeToast} />

      <div className="max-w-[680px] mx-auto px-4 flex flex-col gap-4">
        <Header />
        <StatsCard stats={stats} />
        <TaskForm onAdd={addTask} />
        <FilterBar filter={filter} counts={counts} onFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          loading={loading}
          onEdit={setEditingTask}
          onDelete={setConfirmTarget}
          onStatusChange={changeStatus}
        />
      </div>

      <EditModal
        task={editingTask}
        onSave={editTask}
        onClose={() => setEditingTask(null)}
      />
      <ConfirmDialog
        open={confirmTarget !== null}
        onConfirm={() => deleteTask(confirmTarget)}
        onClose={() => setConfirmTarget(null)}
      />
    </div>
  )
}
