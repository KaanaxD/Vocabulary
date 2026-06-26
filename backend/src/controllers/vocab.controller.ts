import { Response, Request, NextFunction } from 'express';
import vocabService from '../services/vocab.service';
import { z } from "zod"
import categoryService from '../services/category.service';

const ReqBodySchema = z.object({
    indonesia: z.string("input harus berupa kata").min(1, "input tidak boleh kosong"),
    english: z.string("input harus berupa kata").min(1, "input tidak boleh kosong"),
    category_id: z.number("id kategori berupa angka")
})

const ReqParamsSchema = z.object({
    id: z.number("id berupa angka")
})

type ReqParams = z.infer<typeof ReqParamsSchema>
type ReqBody = z.infer<typeof ReqBodySchema>
interface ReqQuery {
    page: number,
    limit: number
}
export default function vocabController() {
    return {
        getAllVocab: async (req: Request<{}, {}, {}, ReqQuery>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { page, limit } = req.query
                const vocab = await vocabService().getAllVocab(req.user.id, page, limit)
                res.json({
                    success: true,
                    message: 'menampilkan semua vocab',
                    data: vocab
                })
            } catch (error) {
                next(error)
            }

        },
        getVocabById: async (req: Request<{ id: number }, {}, {}, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const vocab = await vocabService().getVocab(req.params.id)
                const category = await categoryService().getCategoryById(Number(vocab?.category_id))
                res.json({
                    success: true,
                    message: 'menampilkan semua vocab',
                    data: {
                        vocab: {
                            category: category,
                            ...vocab,
                        }
                    }
                })
            } catch (error) {
                next(error)
            }

        },
        getVocabByCategoryId: async (req: Request<{ id: number }, {}, {}, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const data = await vocabService().getVocabByCategoryId(req.params.id)
                const category = await categoryService().getCategoryById(req.params.id)
                res.json({
                    success: true,
                    message: 'menampilkan semua vocab',
                    data: {
                        category: category,
                        vocab: data
                    }
                })
            } catch (error) {
                next(error)
            }

        },
        addVocab: async (req: Request<{}, {}, ReqBody, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { indonesia, english, category_id } = ReqBodySchema.parse(req.body)
                const data = await vocabService().addVocab(req.user.id, indonesia, english, category_id)
                res.json({
                    success: true,
                    message: 'Berhasil menambahkan',
                    data: data
                })
            } catch (error) {
                next(error)
            }

        },
        deleteVocab: async (req: Request<{ id: number }, {}, {}, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const data = await vocabService().deleteVocab(req.params.id)
                res.json({
                    success: true,
                    message: `berhasil menghapus vocab dengan id : ${req.params.id}`,
                    data: data
                })
            } catch (error) {
                next(error)
            }

        },
        updateVocab: async (req: Request<{ id: number }, {}, ReqBody, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { indonesia, english, category_id } = ReqBodySchema.parse(req.body)
                const data = await vocabService().editVocab(req.params.id, indonesia, english, category_id)
                res.json({
                    success: true,
                    message: 'menampilkan semua vocab',
                    data: data
                })
            } catch (error) {
                next(error)
            }

        },
    }
}