import bcrypt from "bcrypt"
import { createError } from "../middlewares/errorHandler"
import jwt from "jsonwebtoken"
import userService from "./user.service"

export default function authService() {
    return {
        login: async (username: string, password: string) => {
            const user = await userService().userByUsername(username)
            if (!user) {
                throw createError(404, "user tidak ditemukan")
            }
            const check = await bcrypt.compare(password, user.password)
            if (!check) {
                throw createError(401, "password salah")
            }
            const result = jwt.sign({
                id: user.id,
                name: username
            }, process.env.JWT_SECRET as string)
            return result
        }
    }
}