import { createError } from "../middlewares/errorHandler"
import userRepository from "../repository/user.repo"

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
        }
    }
}

