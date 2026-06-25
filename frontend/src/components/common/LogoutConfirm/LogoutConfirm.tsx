import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

interface LogoutConfirmProps {
  onConfirm: () => void
  onCancel: () => void
}

export default function LogoutConfirm({ onConfirm, onCancel }: LogoutConfirmProps) {
  return (
    <Modal onClose={onCancel} className="w-80 text-center" showClose={false}>
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-orange-50">
        <svg className="size-7 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
      <p className="mb-6 text-gray-700 font-medium">Yakin ingin logout?</p>
      <div className="flex justify-center gap-3">
        <button onClick={onCancel}
          className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300 hover:text-gray-700">Batal</button>
        <Button variant="red" onClick={onConfirm} className="px-6 py-2.5">Logout</Button>
      </div>
    </Modal>
  )
}
