import { useState, type FormEvent } from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

interface CategoryFormProps {
  onSave: (name: string, detail: string) => Promise<void>
  onClose: () => void
}

const inputClass = 'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#24B1B1] focus:ring-2 focus:ring-[#24B1B1]/10'

export default function CategoryForm({ onSave, onClose }: CategoryFormProps) {
  const [name, setName] = useState('')
  const [detail, setDetail] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmed = name.trim()
    if (!trimmed) { setError('Nama kategori harus diisi'); return }
    setSaving(true)
    try { await onSave(trimmed, detail.trim()); onClose() }
    catch (err) { setError('Gagal menyimpan kategori') }
    finally { setSaving(false) }
  }

  return (
    <Modal onClose={onClose} className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Buat Kategori Baru</h2>
        {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Nama Kategori</label>
            <input type="text" placeholder="Contoh: Makanan" value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Detail <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <textarea rows={3} placeholder="Deskripsi kategori..." value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className={`${inputClass} resize-none`} />
          </div>
        </div>
        <Button type="submit" loading={saving} className="mt-6 w-full">{saving ? 'Menyimpan...' : 'Buat Kategori'}</Button>
      </form>
    </Modal>
  )
}
