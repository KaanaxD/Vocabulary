import { Response, Request, NextFunction } from 'express';
import vocabService from '../services/vocab.service';
import { z } from "zod"

const ReqBodySchema = z.object({
    indonesia: z.string("input harus berupa kata").min(1, "input tidak boleh kosong"),
    english: z.string("input harus berupa kata").min(1, "input tidak boleh kosong"),
    category: z.string("input harus berupa kata").nullable().optional()
})
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
                const data = await vocabService().getAllVocab(req.user.id, page, limit)
                res.json({
                    success: true,
                    message: 'menampilkan semua vocab',
                    data: data
                })
            } catch (error) {
                next(error)
            }

        },
        getVocabById: async (req: Request<{ id: number }, {}, {}, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const data = await vocabService().getVocab(req.params.id)
                res.json({
                    success: true,
                    message: 'menampilkan semua vocab',
                    data: data
                })
            } catch (error) {
                next(error)
            }

        },
        addVocab: async (req: Request<{}, {}, ReqBody, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { indonesia, english, category } = ReqBodySchema.parse(req.body)
                const data = await vocabService().addVocab(req.user.id, indonesia, english, category)
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
                const { indonesia, english, category } = ReqBodySchema.parse(req.body)
                const data = await vocabService().editVocab(req.params.id, indonesia, english, category)
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