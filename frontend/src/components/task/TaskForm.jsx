import { useState } from 'react'
import { STATUS_OPTIONS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

const INITIAL_FORM = { title: '', description: '', status: 'Todo' }

export function TaskForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
    await onAdd(form)
    setForm(INITIAL_FORM)
    setSubmitting(false)
  }

  return (
    <form
      className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="p-5 flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="form-label" htmlFor="tf-title">
            Judul
          </label>
          <input
            id="tf-title"
            name="title"
            type="text"
            className={`form-input ${error ? 'border-red-500 focus:border-red-500' : ''}`}
            placeholder="Apa yang perlu dikerjakan?"
            value={form.title}
            onChange={handleChange}
            maxLength={255}
            autoComplete="off"
            autoFocus
          />
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="form-label" htmlFor="tf-description">
            Deskripsi{' '}
            <span className="normal-case font-normal tracking-normal text-slate-400">
              (opsional)
            </span>
          </label>
          <textarea
            id="tf-description"
            name="description"
            className="form-input resize-y min-h-[56px] max-h-[112px]"
            placeholder="Tambahkan detail lebih lanjut..."
            value={form.description}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-end gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="form-label" htmlFor="tf-status">
              Status
            </label>
            <select
              id="tf-status"
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

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting}
            className="w-full min-[480px]:w-auto min-[480px]:shrink-0"
          >
            {submitting ? 'Menambahkan...' : '+ Tambah'}
          </Button>
        </div>
      </div>
    </form>
  )
}
