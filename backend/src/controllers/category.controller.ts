import { Response, Request, NextFunction } from 'express';
import categoryService from '../services/category.service';
import z from 'zod';

const ReqBodySchema = z.object({
    name: z.string("harus berupa kata/string").min(1, "nama kategori tidak boleh kosong")
})
type ReqBody = z.infer<typeof ReqBodySchema>

export default function categoryController() {
    return {
        getAllCategory: async (req: Request, res: Response<ResBody>, next: NextFunction) => {
            try {
                const data = await categoryService().getAllCategory(req.user.id)
                res.json({
                    success: true,
                    message: 'berhasil mengambil semua kategori',
                    data: data
                })
            } catch (error) {
                next(error)
            }
        },
        getCategoryById: async (req: Request<{ id: number }>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const data = await categoryService().getCategoryById(req.params.id)
                res.json({
                    success: true,
                    message: `berhasil mengambil kategori dengan id ${req.params.id}`,
                    data: data
                })
            } catch (error) {
                next(error)
            }
        },
        addCategory: async (req: Request<{}, {}, ReqBody>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { name } = ReqBodySchema.parse(req.body)
                const data = await categoryService().addCategory(req.user.id, name)
                res.json({
                    success: true,
                    message: 'berhasil menambah kategori',
                    data: data
                })
            } catch (error) {
                next(error)
            }
        },
        editCategory: async (req: Request<{ id: number }, {}, ReqBody>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { name } = ReqBodySchema.parse(req.body)
                const data = await categoryService().editCategory(req.params.id,name)
                res.json({
                    success: true,
                    message: 'berhasil mengedit kategori',
                    data: data
                })
            } catch (error) {
                next(error)
            }
        },
        deleteCategory: async (req: Request<{id:number}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const data = await categoryService().deleteCategory(req.params.id)
                res.json({
                    success: true,
                    message: 'Berhasil menghapu kategori',
                    data: data
                })
            } catch (error) {
                next(error)
            }
        },
    }
}