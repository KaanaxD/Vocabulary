import { createContext, useContext, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextValue {
  token: string | null
  showAuth: boolean
  setShowAuth: (v: boolean) => void
  showLogoutConfirm: boolean
  setShowLogoutConfirm: (v: boolean) => void
  handleAuth: (newToken: string) => void
  handleLogout: () => void
  handleGetStarted: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [showAuth, setShowAuth] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleAuth = (newToken: string) => {
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setShowLogoutConfirm(false)
    navigate('/')
  }

  const handleGetStarted = () => {
    if (token) navigate('/vocab')
    else setShowAuth(true)
  }

  return (
    <AuthContext.Provider value={{ token, showAuth, setShowAuth, showLogoutConfirm, setShowLogoutConfirm, handleAuth, handleLogout, handleGetStarted }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
