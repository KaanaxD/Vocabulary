import { useCallback, useState } from 'react'
import getErrorMessage from '../utils/getErrorMessage'

export default function useAsync<T>() {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const run = useCallback(async (task: () => Promise<T>) => {
    setLoading(true)
    setError('')
    try {
      const result = await task()
      setData(result)
      return result
    } catch (err) {
      const message = getErrorMessage(err)
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, run, setData, setError }
}
