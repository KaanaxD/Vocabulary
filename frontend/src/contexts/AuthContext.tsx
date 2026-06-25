import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

interface AuthContextValue {
  token: string | null
  authReady: boolean
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
  const [token, saveToken, removeToken] = useLocalStorage('token')
  const [authReady, setAuthReady] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    setAuthReady(true)
    const handleUnauthorized = () => {
      removeToken()
      navigate('/')
    }
    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, [navigate, removeToken])

  const handleAuth = (newToken: string) => {
    saveToken(newToken)
    setShowAuth(false)
  }

  const handleLogout = () => {
    removeToken()
    setShowLogoutConfirm(false)
    navigate('/')
  }

  const handleGetStarted = () => {
    if (token) navigate('/vocab')
    else setShowAuth(true)
  }

  return (
    <AuthContext.Provider value={{ token, authReady, showAuth, setShowAuth, showLogoutConfirm, setShowLogoutConfirm, handleAuth, handleLogout, handleGetStarted }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
