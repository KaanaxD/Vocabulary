import { useEffect, useState, useCallback } from 'react'
import api from '../../services/api'
import type { ApiResponse, Category, CategoryVocabResponse, Vocab, VocabListResponse, VocabPayload } from '../../types/api'
import getErrorMessage from '../../utils/getErrorMessage'
import VocabForm from '../../components/common/VocabForm'
import CategoryForm from '../../components/common/CategoryForm'
import ConfirmDelete from '../../components/common/ConfirmDelete'

export default function VocabPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [vocabs, setVocabs] = useState<Vocab[]>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalItem, setTotalItem] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showVocabForm, setShowVocabForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [loadError, setLoadError] = useState('')

  const selectedCategory = categories.find((category) => category.id === selectedCategoryId) ?? null

  const fetchCategories = useCallback(() => {
    return api.get<ApiResponse<Category[]>>('/category')
      .then((res) => {
        setCategories(res.data.data ?? [])
        setLoadError('')
      })
      .catch((err) => {
        setCategories([])
        setLoadError(getErrorMessage(err, 'Gagal memuat kategori'))
      })
  }, [])

  const fetchVocabs = useCallback((p: number, categoryId: number | null) => {
    if (categoryId) {
      return api.get<ApiResponse<CategoryVocabResponse>>(`/vocab/category/${categoryId}`)
        .then((res) => {
          const data = res.data.data.vocab
          setVocabs(data)
          setTotalPage(1)
          setTotalItem(data.length)
          setLoadError('')
        })
        .catch((err) => setLoadError(getErrorMessage(err, 'Gagal memuat vocab')))
    }

    return api.get<ApiResponse<VocabListResponse>>('/vocab', { params: { page: p, limit: 10 } })
      .then((res) => {
        setVocabs(res.data.data?.data ?? [])
        setTotalPage(res.data.data?.pagination.totalPage ?? 1)
        setTotalItem(res.data.data?.pagination.totalItem ?? 0)
        setLoadError('')
      })
      .catch((err) => setLoadError(getErrorMessage(err, 'Gagal memuat vocab')))
  }, [])

  useEffect(() => {
    Promise.all([fetchCategories(), fetchVocabs(page, selectedCategoryId)]).finally(() => setLoading(false))
  }, [fetchCategories, fetchVocabs, page, selectedCategoryId])

  const afterMutation = () => fetchVocabs(1, selectedCategoryId).then(() => setPage(1))

  const handleSaveVocab = async (data: VocabPayload) => {
    if (editId) await api.put(`/vocab/${editId}`, data)
    else await api.post('/vocab', data)
    await afterMutation()
  }

  const handleSaveCategory = async (name: string, detail: string) => {
    setLoadError('')
    try {
      const res = await api.post<ApiResponse<Category[]>>('/category', { name, detail: detail || null })
      const nextCategory = res.data.data[0]
      await fetchCategories()
      if (nextCategory) setSelectedCategoryId(nextCategory.id)
    } catch (err) {
      setLoadError(getErrorMessage(err, 'Gagal menambah kategori'))
      throw err
    }
  }

  const handleDeleteCategory = async () => {
    if (!deleteCategoryId) return
    setLoadError('')
    try {
      await api.delete(`/category/${deleteCategoryId}`)
      if (selectedCategoryId === deleteCategoryId) setSelectedCategoryId(null)
      setDeleteCategoryId(null)
      await fetchCategories()
      await fetchVocabs(1, null)
    } catch (err) {
      setLoadError(getErrorMessage(err, 'Gagal menghapus kategori'))
    }
  }

  const openAdd = () => { setEditId(null); setShowVocabForm(true) }
  const openEdit = (vocab: Vocab) => { setEditId(vocab.id); setShowVocabForm(true) }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true); setDeleteError('')
    try {
      await api.delete(`/vocab/${deleteId}`)
      setDeleteId(null)
      await afterMutation()
    } catch (err) {
      setDeleteError(getErrorMessage(err, 'Gagal menghapus'))
    } finally { setDeleting(false) }
  }

  if (loading) return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-[3px] border-[#24B1B1] border-t-transparent" />
        <p className="text-sm text-gray-400">Memuat vocab...</p>
      </div>
    </main>
  )

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8 pb-24 md:pb-8 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Vocab</h1>
          <p className="mt-1 text-sm text-gray-500">{selectedCategory ? `Folder: ${selectedCategory.name}` : 'Semua vocab'}</p>
        </div>
        <button onClick={openAdd} disabled={categories.length === 0}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#24B1B1] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#007979] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Vocab
        </button>
      </div>

      {loadError && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{loadError}</p>}

      <div className="mb-4 flex items-center gap-2">
        <button type="button" onClick={() => { setSelectedCategoryId(null); setPage(1) }}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${selectedCategoryId === null ? 'bg-[#007979] text-white shadow-sm' : 'bg-white text-gray-500 hover:text-gray-700'}`}>
          Semua {totalItem > 0 && <span className="ml-1 text-xs opacity-70">({totalItem})</span>}
        </button>
        <button type="button" onClick={() => setShowCategoryForm(true)}
          className="rounded-xl bg-[#24B1B1] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#007979]">+ Kategori</button>
      </div>

      {categories.length > 0 && (
        <section className="mb-8 rounded-3xl bg-white/70 p-5 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.id} className={`group rounded-2xl border p-4 transition-all ${selectedCategoryId === category.id ? 'border-[#24B1B1] bg-[#24B1B1]/10' : 'border-gray-100 bg-white hover:border-[#24B1B1]/40'}`}>
                <button type="button" onClick={() => { setSelectedCategoryId(category.id); setPage(1) }} className="w-full text-left">
                  <div className="mb-3 text-3xl">▣</div>
                  <p className="truncate font-semibold text-gray-900">{category.name}</p>
                  <p className="text-sm text-gray-400">{category.detail || 'Mencakup banyak hal'}</p>
                </button>
                <button type="button" onClick={() => { setDeleteCategoryId(category.id); setDeleteError('') }} className="mt-3 text-xs font-medium text-red-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100">
                  Hapus folder
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {categories.length === 0 && selectedCategoryId !== null ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white/60 py-16 text-center">
          <h2 className="mb-1 text-lg font-semibold text-gray-700">Belum ada kategori</h2>
          <p className="text-sm text-gray-400">Buat folder kategori dulu sebelum menambah vocab.</p>
        </div>
      ) : vocabs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/60 py-20">
          <h2 className="mb-1 text-lg font-semibold text-gray-700">Belum ada vocab</h2>
          <p className="mb-6 text-sm text-gray-400">Mulai tambah kata di folder ini.</p>
          <button onClick={openAdd} className="rounded-xl bg-[#24B1B1] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#007979]">Tambah Vocab</button>
        </div>
      ) : (
        <div className="animate-slide-up overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#007979]">
                <th className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-white/90 md:px-6">Indonesia</th>
                <th className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-white/90 md:px-6">English</th>
                <th className="hidden whitespace-nowrap px-3 py-4 text-sm font-semibold text-white/90 sm:table-cell md:px-6">Ditambahkan</th>
                <th className="whitespace-nowrap px-3 py-4 text-right text-sm font-semibold text-white/90 md:px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {vocabs.map((vocab, i) => (
                <tr key={vocab.id} className={`group border-b border-gray-100 transition-colors last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'} hover:bg-[#24B1B1]/[0.03]`}>
                  <td className="max-w-[120px] truncate px-3 py-4 font-medium text-gray-900 md:max-w-none md:px-6">{vocab.indonesia}</td>
                  <td className="max-w-[120px] truncate px-3 py-4 text-gray-600 md:max-w-none md:px-6">{vocab.english}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-400 sm:table-cell md:px-6">{new Date(vocab.added_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-3 py-4 text-right md:px-6">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(vocab)} className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#24B1B1] transition-colors hover:bg-[#24B1B1]/10">Edit</button>
                      <button onClick={() => { setDeleteId(vocab.id); setDeleteError('') }} className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-500">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {selectedCategoryId === null && vocabs.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-100 px-8 py-5">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-500 transition-all duration-200 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">← Prev</button>
              <span className="text-sm font-medium text-gray-400">{page} / {totalPage}</span>
              <button onClick={() => setPage((p) => Math.min(totalPage, p + 1))} disabled={page >= totalPage} className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-500 transition-all duration-200 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">Next →</button>
            </div>
          )}
        </div>
      )}

      {showVocabForm && (
        <VocabForm
          initial={editId ? (() => { const vocab = vocabs.find((item) => item.id === editId); return { indonesia: vocab?.indonesia ?? '', english: vocab?.english ?? '', category_id: vocab?.category_id ?? selectedCategoryId ?? 0 } })() : { indonesia: '', english: '', category_id: selectedCategoryId ?? categories[0]?.id ?? 0 }}
          editId={editId} categories={categories} onSave={handleSaveVocab} onClose={() => setShowVocabForm(false)} />
      )}
      {showCategoryForm && (
        <CategoryForm onSave={handleSaveCategory} onClose={() => setShowCategoryForm(false)} />
      )}
      {deleteId && (
        <ConfirmDelete onConfirm={handleDelete} onCancel={() => { setDeleteId(null); setDeleteError('') }} loading={deleting} error={deleteError} />
      )}
      {deleteCategoryId && (
        <ConfirmDelete
          title="Hapus kategori?"
          message="Kategori akan dihapus dari folder vocab. Pastikan vocab di dalamnya sudah tidak dibutuhkan atau sudah dipindahkan."
          onConfirm={handleDeleteCategory}
          onCancel={() => { setDeleteCategoryId(null); setDeleteError('') }}
          error={deleteError}
        />
      )}
    </main>
  )
}
