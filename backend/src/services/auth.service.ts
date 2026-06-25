import bcrypt from "bcrypt"
import userRepository from "../repository/user.repo"
import { createError } from "../middlewares/errorHandler"
import jwt from "jsonwebtoken"

export default function authService() {
    return {
        addUser: async (username: string, password: string) => {
            try {
                const encryptPass = await bcrypt.hash(password, 10)
                const result = await userRepository().registerQuery(username, encryptPass)
                if (!result) {
                    throw createError(500, "akun gagal dibuat")
                }
                return result[0]
            } catch (error) {
                if(error instanceof Error && error.message.includes("duplicate")){
                    throw createError(409, "username telah digunakan")
                }
                console.error(error)
                throw createError()
            }
        },
        userById: async (id: number) => {
            const result = await userRepository().getUserById(id)
            if (!result) throw createError(404, "user tidak ditemukan")
            return result[0]
        },
        userByUsername: async (username: string) => {
            const result = await userRepository().getUserByUsername(username)
            if (!result) throw createError(404, "user tidak ditemukan")
            return result[0]
        },
        login: async (username: string, password: string) => {
            const user = await authService().userByUsername(username)
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