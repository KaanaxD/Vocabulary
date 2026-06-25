import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../../contexts/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token, authReady } = useAuth()
  const location = useLocation()

  if (!authReady) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="size-10 animate-spin rounded-full border-[3px] border-[#24B1B1] border-t-transparent" />
      </main>
    )
  }

  return token ? children : <Navigate to="/" replace state={{ from: location }} />
}
