import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

interface ConfirmDeleteProps {
  onConfirm: () => Promise<void> | void
  onCancel: () => void
  loading?: boolean
  error?: string
  title?: string
  message?: string
}

export default function ConfirmDelete({ onConfirm, onCancel, loading, error, title = 'Yakin ingin menghapus?', message = 'Yakin ingin menghapus vocab ini?' }: ConfirmDeleteProps) {
  return (
    <Modal onClose={onCancel} className="w-80 text-center" showClose={false}>
      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-50">
        <svg className="size-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h2 className="mb-2 text-lg font-bold text-gray-900">{title}</h2>
      <p className="mb-6 text-sm text-gray-500">{message}</p>
      <div className="flex justify-center gap-3">
        <button onClick={onCancel} disabled={loading}
          className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300 hover:text-gray-700">Batal</button>
        <Button variant="red" onClick={onConfirm} loading={loading} className="px-6 py-2.5">{loading ? 'Menghapus...' : 'Hapus'}</Button>
      </div>
    </Modal>
  )
}
