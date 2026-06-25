import { useCallback, useState } from 'react'

export default function useLocalStorage(key: string, initialValue: string | null = null) {
  const [value, setValue] = useState<string | null>(() => localStorage.getItem(key) ?? initialValue)

  const saveValue = useCallback((nextValue: string) => {
    localStorage.setItem(key, nextValue)
    setValue(nextValue)
  }, [key])

  const removeValue = useCallback(() => {
    localStorage.removeItem(key)
    setValue(null)
  }, [key])

  return [value, saveValue, removeValue] as const
}
