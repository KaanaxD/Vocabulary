import { createError } from "../middlewares/errorHandler"
import vocabRepository from "../repository/vocab.repo"

export default function vocabService() {
    return {
        getAllVocab: async (user_id: number, page: number = 1, limit: number = 20) => {
            const data = await vocabRepository().getAllVocabQuery(user_id, page, limit)
            return data
        },
        getVocab: async (id: number) => {
            const data = await vocabRepository().getVocabByIdQuery(id)
            if (!data) {
                throw createError(404, "vocab tidak ditemukan")
            }
            return data[0]
        },
        addVocab: async (user_id: number, indonesia: string, inggris: string) => {
            const data = await vocabRepository().addVocabQuery(user_id, indonesia.trim(), inggris.trim())
            if (!data) {
                throw createError(500, "vocab gagal ditambahkan")
            }
            return data[0]
        },
        deleteVocab: async (id: number) => {
            const data = await vocabRepository().deleteVocabQuery(id)
            if (!data) {
                throw createError(404, "vocab tidak ditemukan dan gagal dihapus")
            }
            return data[0]
        },
        editVocab: async (id: number, indonesia: string, inggris: string) => {
            const data = await vocabRepository().editVocabQuery(id, indonesia.trim(), inggris.trim())
            if (!data) {
                throw createError(404, "vocab tidak ditemukan")
            }
            return data[0]
        }
    }
}