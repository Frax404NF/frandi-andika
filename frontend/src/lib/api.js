const BASE_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.detail ?? JSON.stringify(data))
  return data
}

export const getTasks = () => request('/tasks')

export const getStats = () => request('/tasks/stats')

export const createTask = (data) =>
  request('/tasks', { method: 'POST', body: JSON.stringify(data) })

export const updateTask = (id, data) =>
  request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: 'DELETE' })
