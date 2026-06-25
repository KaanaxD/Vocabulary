import { useRef, useState } from 'react'
import api from '../../../services/api'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

interface AuthModalProps {
  onClose: () => void
  onAuth: (token: string) => void
}

export default function AuthModal({ onClose, onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [justRegistered, setJustRegistered] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        await api.post('/auth/register', { username, password })
        setUsername(''); setPassword('')
        setJustRegistered(true)
        setMode('login')
      } else {
        const res = await api.post('/auth/login', { username, password })
        localStorage.setItem('token', res.data.token)
        onAuth(res.data.token)
        onClose()
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Terjadi kesalahan')
    } finally { setLoading(false) }
  }

  return (
    <Modal onClose={onClose} className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{mode === 'login' ? 'Welcome Back' : 'Buat Akun'}</h2>
          <p className="mt-1 text-sm text-gray-400">{mode === 'login' ? 'Login untuk melanjutkan' : 'Daftar untuk mulai belajar'}</p>
        </div>

        <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
          {(['login', 'register'] as const).map((m) => (
            <button key={m} type="button" onClick={() => { setMode(m); setError(''); setJustRegistered(false) }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 ${mode === m ? 'bg-white text-[#007979] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{m === 'login' ? 'Login' : 'Register'}</button>
          ))}
        </div>

        {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        {justRegistered && mode === 'login' && (
          <p className="mb-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">Akun berhasil didaftar! Silakan login.</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Username</label>
            <input type="text" placeholder="Masukkan username" value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); passwordRef.current?.focus() } }}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#24B1B1] focus:ring-2 focus:ring-[#24B1B1]/10" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Password</label>
            <input ref={passwordRef} type="password" placeholder="Masukkan password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#24B1B1] focus:ring-2 focus:ring-[#24B1B1]/10" />
          </div>
        </div>

        <Button type="submit" loading={loading} className="mt-6 w-full">
          {loading ? 'Memproses...' : mode === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
    </Modal>
  )
}
