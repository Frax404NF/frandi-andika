import { useState, useEffect } from 'react'
import { STATUS_OPTIONS } from '@/lib/constants'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

function buildForm(task) {
  return {
    title: task.title,
    description: task.description ?? '',
    status: task.status,
  }
}

export function EditModal({ task, onSave, onClose }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'Todo' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!task) return
    setForm(buildForm(task))
    setError('')
  }, [task])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'title' && error) setError('')
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Judul tidak boleh kosong.')
      return
    }
    setSubmitting(true)
    await onSave(task.id, form)
    setSubmitting(false)
  }

  return (
    <Dialog open={!!task} onClose={onClose} title="Edit Tugas">
      <form className="flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1.5">
          <label className="form-label" htmlFor="em-title">
            Judul
          </label>
          <input
            id="em-title"
            name="title"
            type="text"
            className={`form-input ${error ? 'border-red-500 focus:border-red-500' : ''}`}
            value={form.title}
            onChange={handleChange}
            maxLength={255}
            autoComplete="off"
            autoFocus
          />
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label" htmlFor="em-description">
            Deskripsi{' '}
            <span className="normal-case font-normal tracking-normal text-slate-400">
              (opsional)
            </span>
          </label>
          <textarea
            id="em-description"
            name="description"
            className="form-input resize-y min-h-[56px] max-h-[112px]"
            value={form.description}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label" htmlFor="em-status">
            Status
          </label>
          <select
            id="em-status"
            name="status"
            className="form-input appearance-none pr-8 select-chevron cursor-pointer"
            value={form.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" size="md" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="primary" size="md" disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
