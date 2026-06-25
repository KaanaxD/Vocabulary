import axios from 'axios'

interface ApiErrorBody {
  message?: string
}

export default function getErrorMessage(error: unknown, fallback = 'Terjadi kesalahan') {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    if (error.response?.data?.message) return error.response.data.message
    if (error.code === 'ECONNABORTED') return 'Request terlalu lama, coba lagi.'
    if (!error.response) return 'Tidak dapat terhubung ke server.'
  }

  return error instanceof Error && error.message ? error.message : fallback
}
