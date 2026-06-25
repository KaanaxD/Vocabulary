import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: string
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: '' }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message || 'Halaman gagal dimuat' }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-sm rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-400">!</div>
          <h1 className="mb-2 text-xl font-bold text-gray-900">Ada yang bermasalah</h1>
          <p className="mb-6 text-sm text-gray-500">{this.state.error}</p>
          <button type="button" onClick={() => this.setState({ error: '' })}
            className="rounded-xl bg-[#24B1B1] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#007979]">
            Coba lagi
          </button>
        </div>
      </main>
    )
  }
}
