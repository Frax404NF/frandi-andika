import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'

export function ConfirmDialog({ open, onConfirm, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} title="Hapus Tugas">
      <p className="text-sm text-slate-700 leading-relaxed">
        Tugas ini akan dihapus permanen. Lanjutkan?
      </p>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" size="md" onClick={onClose}>
          Batal
        </Button>
        <Button type="button" variant="danger" size="md" onClick={onConfirm}>
          Hapus
        </Button>
      </div>
    </Dialog>
  )
}
