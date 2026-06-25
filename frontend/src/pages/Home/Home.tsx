import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function getUserName(token: string | null): string | null {
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1]!)).name
  } catch {
    return null
  }
}

export default function Home() {
  const { token, handleGetStarted } = useAuth()
  const name = getUserName(token)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash === '#about') {
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [location.hash])

  useEffect(() => {
    const el = document.getElementById('about')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) navigate('#about', { replace: true })
        else navigate('.', { replace: true })
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
    // ponytail: navigate is stable, no need for deps
  }, [navigate])

  return (
    <main className="flex-1">
      <section className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center px-6 py-16 pb-24 text-center md:pb-16">
        <div className="animate-slide-up mx-auto max-w-2xl">
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#24B1B1] to-[#007979] shadow-lg shadow-[#24B1B1]/20">
            <svg className="size-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          {name ? (
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              Halo, <span className="text-[#007979]">{name}</span>
            </h1>
          ) : (
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              Expand Your <span className="text-[#007979]">Vocabulary</span>
            </h1>
          )}
          <p className="mb-8 text-lg leading-relaxed text-gray-500">
            Learn new words, track your progress, and practice daily.
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#24B1B1] to-[#007979] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#24B1B1]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#24B1B1]/30"
          >
            {token ? 'Mulai Belajar' : 'Get Started'}
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      <section id="about" className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center border-t border-gray-200/60 bg-white/50 px-6 py-16 pb-24 md:pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">Tentang Aplikasi Ini</h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-500 leading-relaxed">
            Aplikasi ini membantu kamu belajar kosakata bahasa Inggris dengan cara yang mudah dan menyenangkan.
            Tambah vocab, lihat daftar, dan latihan setiap hari untuk meningkatkan kemampuan bahasa Inggrismu.
          </p>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', title: 'Kelola Vocab', desc: 'Tambah, edit, dan hapus kosakata dengan mudah.' },
              { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Latihan', desc: 'Uji pemahaman dengan mode latihan interaktif.' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Cepat & Responsif', desc: 'Aplikasi ringan dengan pengalaman pengguna yang modern.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-[#24B1B1]/10">
                  <svg className="size-6 text-[#24B1B1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
