import { useLocation, useNavigate } from 'react-router-dom'

interface NavbarProps {
  token: string | null
  onLoginClick: () => void
  onLogout: () => void
}

const linkBase = 'block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200'
const linkActive = `${linkBase} bg-white text-[#007979] shadow-sm`
const linkInactive = `${linkBase} text-white/80 hover:bg-white/15 hover:text-white`

const iconBase = 'flex size-12 items-center justify-center rounded-full text-xs font-medium transition-all duration-200'
const iconActive = `${iconBase} bg-white text-[#007979] shadow-sm`
const iconInactive = `${iconBase} text-white/70 hover:bg-white/15 hover:text-white`

export default function Navbar({ token, onLoginClick, onLogout }: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const atHome = location.pathname === '/' && !location.hash
  const aboutActive = location.pathname === '/' && location.hash === '#about'
  const atVocab = location.pathname === '/vocab'
  const atPractice = location.pathname === '/practice'

  const handleHome = () => {
    window.scrollTo(0, 0)
    if (location.pathname !== '/' || location.hash) navigate('/')
  }

  const handleAbout = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('about')
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return }
    }
    navigate('/')
    setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const handleVocab = () => {
    if (!token) { onLoginClick(); return }
    navigate('/vocab')
  }

  return (
    <>
      {/* Desktop: top navbar */}
      <nav className="sticky top-0 z-40 hidden bg-[#007979] shadow-lg shadow-black/5 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5 lg:px-8">
          <button onClick={handleHome} className="text-lg font-bold tracking-tight text-white lg:text-xl">Vocabulary</button>
          <div className="flex items-center gap-1">
            <button onClick={handleHome} className={atHome ? linkActive : linkInactive}>Home</button>
            <button onClick={handleAbout} className={aboutActive ? linkActive : linkInactive}>About</button>
            {token && (
              <>
                <button onClick={handleVocab} className={atVocab ? linkActive : linkInactive}>Vocab</button>
                <button onClick={() => navigate('/practice')} className={atPractice ? linkActive : linkInactive}>Practice</button>
                <span className="mx-2 h-5 w-px bg-white/20" />
                <button onClick={onLogout} className={`${linkBase} text-white/70 hover:bg-white/10 hover:text-white`}>Logout</button>
              </>
            )}
            {!token && (
              <>
                <button onClick={handleVocab} className={atVocab ? linkActive : linkInactive}>Vocab</button>
                <button onClick={() => navigate('/practice')} className={linkInactive}>Practice</button>
                <button onClick={onLoginClick} className={`${linkBase} bg-white/15 text-white hover:bg-white/25`}>Login</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile: bottom navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#007979] shadow-lg shadow-black/5 md:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          <button onClick={handleHome} className={atHome ? iconActive : iconInactive}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button onClick={handleAbout} className={aboutActive ? iconActive : iconInactive}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button onClick={handleVocab} className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#24B1B1] to-[#007979] text-white shadow-lg shadow-[#24B1B1]/20 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
          <button onClick={() => token ? navigate('/practice') : onLoginClick()} className={atPractice ? iconActive : iconInactive}>
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
          {token ? (
            <button onClick={onLogout} className={iconInactive}>
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          ) : (
            <button onClick={onLoginClick} className={iconInactive}>
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </nav>
    </>
  )
}
