import type { ReactNode } from 'react'
import useEscapeKey from '../../../hooks/useEscapeKey'

interface ModalProps {
  children: ReactNode
  onClose: () => void
  className?: string
  showClose?: boolean
}

export default function Modal({ children, onClose, className = '', showClose = true }: ModalProps) {
  useEscapeKey(onClose)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={`animate-fade-in relative rounded-3xl bg-white p-8 shadow-2xl ${className}`}>
        {showClose && (
          <button type="button" onClick={onClose}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-xl text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500">✕</button>
        )}
        {children}
      </div>
    </div>
  )
}
