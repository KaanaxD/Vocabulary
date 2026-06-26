import { createError } from "../middlewares/errorHandler"
import categoryRepo from "../repository/category.repo"
import formatInput from "../utils/formatInput"

export default function categoryService() {
    return {
        getAllCategory: async (user_id: number) => {
            const data = await categoryRepo().getAllCategoryQuery(user_id)
            if (!data) {
                throw createError(404, "user tidak ditemukan")
            }
            return data
        },
        getCategoryById: async (id: number) => {
            const data = await categoryRepo().getCategoryByIdQuery(id)
            if (!data) {
                throw createError(404, "categories tidak ditemukan")
            }
            return data
        },
        addCategory: async (user_id: number, name: string) => {
            try {
                const data = await categoryRepo().addCategoryQuery(user_id, formatInput(name))
                if (!data) {
                    throw createError(404, "user tidak ditemukan")
                }
                return data
            } catch (error) {
                if (error instanceof Error && error.message.includes("duplicate key")) {
                    throw createError(409, "category already exist")
                } else if (error instanceof Error && error.message.includes("foreign key")){
                    throw createError(404,"user tidak ditemukan")
                }
                throw error
            }
        },
        editCategory: async (id: number, name: string) => {
            try {
                const data = await categoryRepo().editCategoryQuery(id, formatInput(name))
                if (!data) {
                    return null
                }
                return data[0]
            } catch (error) {
                if (error instanceof Error && error.message.includes("duplicate")) {
                    throw createError(409, "category already exist")
                }
                throw createError()
            }
        },
        deleteCategory: async (id: number) => {
            const data = await categoryRepo().deleteCategoryQuery(id)
            if (!data) {
                throw createError(404, "category tidak ditemukan, gagal dihapus")
            }
            return data
        },
    }
}