export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface AuthResponse {
  success: boolean
  message: string
  token: string
}

export interface Pagination {
  page: number
  limit: number
  totalPage: number
  totalItem: number
}

export interface Vocab {
  id: number
  indonesia: string
  english: string
  category_id: number
  added_at: string
}

export interface Category {
  id: number
  user_id?: number
  name: string
  detail: string | null
  created_at: string
}

export interface VocabListResponse {
  data: Vocab[]
  pagination: Pagination
}

export interface VocabPayload {
  indonesia: string
  english: string
  category_id: number
}

export interface CategoryVocabResponse {
  category: Category
  vocab: Vocab[]
}
