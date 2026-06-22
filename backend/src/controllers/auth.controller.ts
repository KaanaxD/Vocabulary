import { Response, Request, NextFunction } from 'express';
import { z } from "zod"
import authService from '../services/auth.service';
const reqBodySchema = z.object({
    username: z.string("input berupa string").min(3, "username minimal 3 karakter"),
    password: z.string("input ebrupa string").min(8, "password minimal 3 karakter")
})

type ReqBody = z.infer<typeof reqBodySchema>

export default function authController() {
    return {
        register: async (req: Request<{}, {}, ReqBody, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { username, password } = reqBodySchema.parse(req.body)
                const data = await authService().addUser(username, password)
                res.json({
                    success: true,
                    message: '',
                    data: data
                })
            } catch (error) {
                next(error)
            }
        },
        login: async (req: Request<{}, {}, ReqBody, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                const { username, password } = reqBodySchema.parse(req.body)
                const token = await authService().login(username,password)
                res.json({
                    success: true,
                    message: 'berhasil login',
                    token: token
                })
                
            } catch (error) {
                next(error)
            }
        }
    }
}