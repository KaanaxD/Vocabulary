import { createError } from "../middlewares/errorHandler"
import bcrypt from "bcrypt"
import userRepository from "../repository/user.repo"
import categoryRepo from "../repository/category.repo"
import categoryService from "./category.service"
import formatInput from "../utils/formatInput"

export default function userService() {
    return {
        getUser: async (user: number | string) => {
            if (typeof user == 'number') {
                const data = await userRepository().getUserById(user)
                if (!data) throw createError(404, "user tidak ditemukan")
                return data[0]
            }
            if (typeof user == 'string') {
                const data = await userRepository().getUserByUsername(user)
                if (!data) throw createError(404, "user tidak ditemukan")
                return data[0]
            }
        },
        addUser: async (username: string, password: string) => {
            try {
                const encryptPass = await bcrypt.hash(password, 10)
                const result = await userRepository().registerQuery(username, encryptPass)
                if (!result|| !result[0]) {
                    throw createError(500, "akun gagal dibuat")
                }
                await categoryService().addCategory(Number(result[0].id),formatInput('general'))
                return result[0]
            } catch (error) {
                if (error instanceof Error && error.message.includes("duplicate")) {
                    throw createError(409, "username telah digunakan")
                }
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
    }
}

