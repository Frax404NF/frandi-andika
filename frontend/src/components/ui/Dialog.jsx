import { useEffect, useRef } from 'react'

export function Dialog({ open, onClose, title, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleCancel = (e) => {
      e.preventDefault()
      onClose()
    }
    el.addEventListener('cancel', handleCancel)
    return () => el.removeEventListener('cancel', handleCancel)
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === ref.current) onClose()
  }

  return (
    <dialog ref={ref} className="task-dialog" onClick={handleBackdropClick}>
      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-slate-950">{title}</h2>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md px-2 py-1 text-lg leading-none transition-colors duration-150 cursor-pointer"
            onClick={onClose}
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </dialog>
  )
}
