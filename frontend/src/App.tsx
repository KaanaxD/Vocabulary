import Navbar from './components/layout/Navbar/Navbar'
import AuthModal from './components/layout/AuthModal'
import LogoutConfirm from './components/common/LogoutConfirm'
import AppRoutes from './routes'
import { useAuth } from './contexts/AuthContext'

export default function App() {
  const { token, showAuth, setShowAuth, showLogoutConfirm, setShowLogoutConfirm, handleAuth, handleLogout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF0E4]">
      <Navbar
        token={token}
        onLoginClick={() => setShowAuth(true)}
        onLogout={() => setShowLogoutConfirm(true)}
      />
      <AppRoutes />
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onAuth={handleAuth}
        />
      )}
      {showLogoutConfirm && (
        <LogoutConfirm
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </div>
  )
}
