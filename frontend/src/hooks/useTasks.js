import { useState, useEffect, useCallback } from 'react'
import * as api from '@/lib/api'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState(null)
  const [filter, setFilter] = useState('All')
  const [editingTask, setEditingTask] = useState(null)
  const [confirmTarget, setConfirmTarget] = useState(null)
  const [toasts, setToasts] = useState([])
  const [loading, setLoading] = useState(true)

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((t) => t.status === filter)

  const counts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === 'Todo').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    done: tasks.filter((t) => t.status === 'Done').length,
  }

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (type, message) => {
      const id = Date.now() + Math.random()
      setToasts((prev) => [...prev.slice(-2), { id, type, message }])
      setTimeout(() => removeToast(id), 3000)
    },
    [removeToast],
  )

  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getStats()
      setStats(data)
    } catch {
      // bonus endpoint — fail silently
    }
  }, [])

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getTasks()
      setTasks(data)
    } catch (err) {
      addToast('error', err.message)
    } finally {
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => {
    fetchTasks()
    fetchStats()
  }, [fetchTasks, fetchStats])

  const addTask = useCallback(
    async (data) => {
      try {
        const task = await api.createTask(data)
        setTasks((prev) => [task, ...prev])
        fetchStats()
        addToast('success', 'Task added.')
      } catch (err) {
        addToast('error', err.message)
      }
    },
    [fetchStats, addToast],
  )

  const editTask = useCallback(
    async (id, data) => {
      try {
        const updated = await api.updateTask(id, data)
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
        setEditingTask(null)
        fetchStats()
        addToast('success', 'Task updated.')
      } catch (err) {
        addToast('error', err.message)
      }
    },
    [fetchStats, addToast],
  )

  const deleteTask = useCallback(
    async (id) => {
      try {
        await api.deleteTask(id)
        setTasks((prev) => prev.filter((t) => t.id !== id))
        setConfirmTarget(null)
        fetchStats()
        addToast('success', 'Task deleted.')
      } catch (err) {
        addToast('error', err.message)
      }
    },
    [fetchStats, addToast],
  )

  const changeStatus = useCallback(
    async (id, status) => {
      try {
        const updated = await api.updateTask(id, { status })
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
        fetchStats()
        addToast('success', 'Status updated.')
      } catch (err) {
        addToast('error', err.message)
      }
    },
    [fetchStats, addToast],
  )

  return {
    tasks,
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
  }
}
