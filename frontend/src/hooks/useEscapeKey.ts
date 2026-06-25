import { useEffect } from 'react'

export default function useEscapeKey(handler: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handler() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [handler])
}
