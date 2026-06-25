import { useEffect, useState, useCallback } from 'react'
import api from '../../services/api'
import VocabForm from '../../components/common/VocabForm'
import ConfirmDelete from '../../components/common/ConfirmDelete'

interface Vocab {
  id: number
  indonesia: string
  english: string
  added_at: string
}

export default function VocabPage() {
  const [vocabs, setVocabs] = useState<Vocab[]>([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalItem, setTotalItem] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const fetchVocabs = useCallback((p: number) => {
    return api.get('/vocab', { params: { page: p, limit: 10 } })
      .then((res) => {
        setVocabs(res.data.data.data)
        setTotalPage(res.data.data.pagination.totalPage)
        setTotalItem(res.data.data.pagination.totalItem)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetchVocabs(page).finally(() => setLoading(false))
  }, [fetchVocabs, page])
  // ponytail: resets page to 1 when user adds/deletes from another page and it might be empty
  const afterMutation = () => fetchVocabs(1).then(() => setPage(1))

  const handleSave = async (data: { indonesia: string; inggris: string }) => {
    if (editId) {
      await api.put(`/vocab/${editId}`, data)
    } else {
      await api.post('/vocab', data)
    }
    afterMutation()
  }

  const openAdd = () => { setEditId(null); setShowForm(true) }
  const openEdit = (v: Vocab) => { setEditId(v.id); setShowForm(true) }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true); setDeleteError('')
    try {
      await api.delete(`/vocab/${deleteId}`)
      setDeleteId(null)
      afterMutation()
    } catch (err: any) {
      setDeleteError(err.response?.data?.message || 'Gagal menghapus')
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
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8 pb-24 md:pb-8 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">My Vocab</h1>
          {vocabs.length > 0 && (
            <span className="rounded-full bg-[#24B1B1]/10 px-3.5 py-1 text-sm font-medium text-[#007979]">
              {totalItem} kata
            </span>
          )}
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#24B1B1] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#007979] hover:shadow-md">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah
        </button>
      </div>

      {vocabs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/60 py-24">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#24B1B1]/10">
            <svg className="size-8 text-[#24B1B1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="mb-1 text-lg font-semibold text-gray-700">Belum ada vocab</h2>
          <p className="mb-6 text-sm text-gray-400">Mulai tambah kata pertama kamu!</p>
          <button onClick={openAdd}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#24B1B1] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#007979]">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Vocab
          </button>
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
              {vocabs.map((v, i) => (
                <tr key={v.id} className={`group border-b border-gray-100 transition-colors last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'} hover:bg-[#24B1B1]/[0.03]`}>
                  <td className="max-w-[120px] truncate px-3 py-4 font-medium text-gray-900 md:max-w-none md:px-6">{v.indonesia}</td>
                  <td className="max-w-[120px] truncate px-3 py-4 text-gray-600 md:max-w-none md:px-6">{v.english}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-400 sm:table-cell md:px-6">{new Date(v.added_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-3 py-4 text-right md:px-6">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(v)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#24B1B1] transition-colors hover:bg-[#24B1B1]/10">
                        Edit
                      </button>
                      <button onClick={() => { setDeleteId(v.id); setDeleteError('') }}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-500">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {vocabs.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-100 px-8 py-5">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-500 transition-all duration-200 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">
                ← Prev
              </button>
              <span className="text-sm font-medium text-gray-400">{page} / {totalPage}</span>
              <button onClick={() => setPage((p) => Math.min(totalPage, p + 1))} disabled={page >= totalPage}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-500 transition-all duration-200 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">
                Next →
              </button>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <VocabForm
          initial={editId ? (() => { const v = vocabs.find((v) => v.id === editId); return { indonesia: v?.indonesia ?? '', inggris: v?.english ?? '' } })() : { indonesia: '', inggris: '' }}
          editId={editId} onSave={handleSave} onClose={() => setShowForm(false)} />
      )}
      {deleteId && (
        <ConfirmDelete onConfirm={handleDelete} onCancel={() => { setDeleteId(null); setDeleteError('') }} loading={deleting} error={deleteError} />
      )}
    </main>
  )
}
