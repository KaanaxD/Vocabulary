import { useRef, useState } from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'

interface VocabFormData { indonesia: string; inggris: string }
interface VocabFormProps {
  initial: VocabFormData
  editId: number | null
  onSave: (data: VocabFormData) => Promise<void>
  onClose: () => void
}

const inputClass = 'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#24B1B1] focus:ring-2 focus:ring-[#24B1B1]/10'

export default function VocabForm({ initial, editId, onSave, onClose }: VocabFormProps) {
  const [batch, setBatch] = useState(false)
  const [form, setForm] = useState<VocabFormData>(initial)
  const [batchText, setBatchText] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [results, setResults] = useState<{ line: number; text: string; ok: boolean; msg: string }[]>([])
  const inggrisRef = useRef<HTMLInputElement>(null)

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.indonesia.trim() || !form.inggris.trim()) { setError('Kedua field harus diisi'); return }
    setSaving(true)
    try { await onSave(form); onClose() }
    catch (err: any) { setError(err.response?.data?.message || 'Gagal menyimpan') }
    finally { setSaving(false) }
  }

  const handleBatchSubmit = async () => {
    setError('')
    const lines = batchText.split('\n').map((l) => l.trim()).filter(Boolean)
    if (!lines.length) { setError('Isi minimal satu baris'); return }
    const pairs: VocabFormData[] = []
    for (const [i, line] of lines.entries()) {
      const parts = line.split(/[|,]/).map((s) => s.trim())
      if (parts.length < 2 || !parts[0] || !parts[1]) { setError(`Baris ${i + 1}: format salah. Gunakan: indonesia | inggris`); return }
      pairs.push({ indonesia: parts[0], inggris: parts[1] })
    }
    setSaving(true); setResults([])
    const out: typeof results = []
    for (const [i, p] of pairs.entries()) {
      try { await onSave(p); out.push({ line: i + 1, text: `${p.indonesia} | ${p.inggris}`, ok: true, msg: 'Berhasil' }) }
      catch (err: any) { out.push({ line: i + 1, text: `${p.indonesia} | ${p.inggris}`, ok: false, msg: err.response?.data?.message || 'Gagal' }) }
      setResults([...out])
    }
    setSaving(false)
  }

  if (editId || !batch) return (
    <Modal onClose={onClose} className="w-full max-w-sm">
      <form onSubmit={handleSingleSubmit}>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">{editId ? 'Edit Vocab' : 'Tambah Vocab'}</h2>
        {!editId && (
          <button type="button" onClick={() => setBatch(true)}
            className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#24B1B1]/30 px-4 py-3 text-sm font-medium text-[#24B1B1] transition-all duration-200 hover:border-[#24B1B1] hover:bg-[#24B1B1]/5">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            Tambah banyak sekaligus
          </button>
        )}
        {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Indonesia</label>
            <input type="text" placeholder="Contoh: Apel" value={form.indonesia}
              onChange={(e) => setForm({ ...form, indonesia: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); inggrisRef.current?.focus() } }}
              className={inputClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">Inggris</label>
            <input ref={inggrisRef} type="text" placeholder="Contoh: Apple" value={form.inggris}
              onChange={(e) => setForm({ ...form, inggris: e.target.value })}
              className={inputClass} />
          </div>
        </div>
        <Button type="submit" loading={saving} className="mt-6 w-full">{saving ? 'Menyimpan...' : editId ? 'Simpan' : 'Tambah'}</Button>
      </form>
    </Modal>
  )

  return (
    <Modal onClose={onClose} className="w-full max-w-lg">
      <h2 className="mb-1 text-2xl font-bold text-gray-900">Tambah Banyak Vocab</h2>
      <p className="mb-6 text-sm text-gray-400">Satu baris = satu vocab. Format: <code className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600">indonesia | inggris</code></p>
      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      <textarea rows={8} placeholder="Apel | Apple&#10;Buku | Book&#10;Meja | Table" value={batchText}
        onChange={(e) => setBatchText(e.target.value)}
        className="mb-4 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#24B1B1] focus:ring-2 focus:ring-[#24B1B1]/10" />
      {results.length > 0 && (
        <div className="mb-4 max-h-40 overflow-y-auto rounded-xl border border-gray-100 text-sm">
          {results.map((r) => (
            <div key={r.line} className={`flex items-center gap-3 border-b border-gray-50 px-4 py-2.5 last:border-0 ${r.ok ? 'text-green-700' : 'text-red-600'}`}>
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-current/10 text-xs font-bold">{r.ok ? '✓' : '✗'}</span>
              <span className="truncate text-gray-700">{r.text}</span>
              <span className="ml-auto shrink-0 text-xs opacity-70">{r.msg}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <button type="button" onClick={() => setBatch(false)}
          className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300 hover:text-gray-700">← Single</button>
        <Button onClick={handleBatchSubmit} loading={saving} className="flex-1 px-8 py-2.5">{saving ? 'Menyimpan...' : 'Simpan Semua'}</Button>
      </div>
    </Modal>
  )
}
