const TOAST_CLASSES = {
  success: 'bg-green-100 text-green-800 border border-green-200',
  error: 'bg-red-50 text-red-800 border border-red-200',
}

export function Toast({ toasts, onRemove }) {
  return (
    <div
      className="fixed top-4 right-4 sm:top-6 sm:right-6 flex flex-col gap-2 z-[9999] pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`text-sm font-medium px-4 py-3 rounded-lg max-w-xs shadow-md cursor-pointer pointer-events-auto toast-enter ${TOAST_CLASSES[toast.type]}`}
          onClick={() => onRemove(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
