const VARIANT_CLASSES = {
  primary: 'bg-indigo-600 text-white border border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700',
  ghost: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
  danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
}

const SIZE_CLASSES = {
  sm: 'text-xs px-2.5 py-1.5',
  md: 'text-sm px-4 py-2',
}

export function Button({ variant = 'ghost', size = 'md', className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium rounded-md transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
