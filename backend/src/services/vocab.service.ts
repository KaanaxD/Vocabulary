import { createError } from "../middlewares/errorHandler"
import vocabRepository from "../repository/vocab.repo"
import formatInput from "../utils/formatInput"

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
        addVocab: async (user_id: number, indonesia: string, english: string, category: string | null = null) => {
            try {
                if (category) {
                    category = formatInput(category)
                } else {
                    category = null;
                }
                const data = await vocabRepository().addVocabQuery(user_id, formatInput(indonesia), formatInput(english), category)
                if (!data) {
                    throw createError(500, "vocab gagal ditambahkan")
                }
                return data[0]
            } catch (error) {
                if (error instanceof Error && error.message.includes('duplicate')) {
                    throw createError(409, "vocab sudah ada")
                }
                throw createError(500, "vocab gagal ditambahkan")
            }
        },
        deleteVocab: async (id: number) => {
            const data = await vocabRepository().deleteVocabQuery(id)
            if (!data) {
                throw createError(404, "vocab tidak ditemukan dan gagal dihapus")
            }
            return data[0]
        },
        editVocab: async (id: number, indonesia: string, english: string, category: string | null = null) => {
            if (category) {
                category = formatInput(category)
            } else {
                category = null;
            }
            const data = await vocabRepository().editVocabQuery(id, formatInput(indonesia), formatInput(english), category)
            if (!data) {
                throw createError(404, "vocab tidak ditemukan")
            }
            return data[0]
        }
    }
}