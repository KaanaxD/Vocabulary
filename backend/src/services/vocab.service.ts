import { createError } from "../middlewares/errorHandler"
import vocabRepository from "../repository/vocab.repo"
import formatInput from "../utils/formatInput"

export default function vocabService() {
    return {
        getAllVocab: async (user_id: number, page: number = 1, limit: number = 20) => {
            const vocab = await vocabRepository().getAllVocabQuery(user_id, page, limit)
            return vocab
        },
        getVocab: async (id: number) => {
            const vocab = await vocabRepository().getVocabByIdQuery(id)
            if (!vocab) {
                throw createError(404, "vocab tidak ditemukan")
            }
            return vocab[0]
        },
        getVocabByCategoryId: async (category_id: number) => {
            const vocab = await vocabRepository().getVocabByCategoryIdQuery(category_id)
            if(!vocab){
                return []
            }
            return vocab
        },
        addVocab: async (user_id: number, indonesia: string, english: string, category_id: number) => {
            try {
                const vocab = await vocabRepository().addVocabQuery(user_id, formatInput(indonesia), formatInput(english), category_id)
                if (!vocab) {
                    throw createError(500, "vocab gagal ditambahkan")
                }
                return vocab[0]
            } catch (error) {
                if (error instanceof Error && error.message.includes('duplicate')) {
                    throw createError(409, "vocab sudah ada")
                }
                throw error
            }
        },
        deleteVocab: async (id: number) => {
            const vocab = await vocabRepository().deleteVocabQuery(id)
            if (!vocab) {
                throw createError(404, "vocab tidak ditemukan dan gagal dihapus")
            }
            return vocab[0]
        },
        editVocab: async (id: number, indonesia: string, english: string, category: number) => {
            const vocab = await vocabRepository().editVocabQuery(id, formatInput(indonesia), formatInput(english), category)
            if (!vocab) {
                throw createError(404, "vocab tidak ditemukan")
            }
            return vocab[0]
        }
    }
}