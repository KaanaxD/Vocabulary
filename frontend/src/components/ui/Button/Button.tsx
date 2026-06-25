import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'submit' | 'button'
  variant?: 'teal' | 'red'
  disabled?: boolean
  loading?: boolean
  className?: string
}

const base = 'rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50'

const variants: Record<string, string> = {
  teal: `${base} bg-gradient-to-r from-[#24B1B1] to-[#007979] shadow-[#24B1B1]/20`,
  red: `${base} bg-gradient-to-r from-red-400 to-red-500 shadow-red-400/20`,
}

export default function Button({ children, onClick, type, variant = 'teal', disabled, loading, className = '' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading}
      className={`${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
