import { pool } from "../configs/pg";

export default function categoryRepo() {
    return {
        getAllCategoryQuery: async (user_id: number): Promise<Category[] | null> => {
            const category = await pool.query(`SELECT * FROM categories WHERE user_id = $1`, [user_id])
            if (category.rows.length == 0) {
                return null
            }
            return category.rows;
        },
        getCategoryByIdQuery: async (id: number): Promise<Category[] | null> => {
            const category = await pool.query(`SELECT * FROM categories WHERE id = $1`, [id])
            if (category.rows.length == 0) {
                return null
            }
            return category.rows;
        },
        editCategoryQuery: async (id: number, name: string,detail:string|null=null): Promise<Category[] | null> => {
            const vocab = await pool.query(`UPDATE categories SET name=$1, detail=$2 WHERE ID = $3 RETURNING *`, [name,detail, id])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows;
        },
        addCategoryQuery: async (user_id: number, name: string,detail:string|null=null): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`INSERT INTO categories (user_id,name,detail) VALUES ($1,$2,$3) RETURNING *`, [user_id, name,detail])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows;
        },
        deleteCategoryQuery: async (id: number): Promise<Category[] | null> => {
            const vocab = await pool.query(`DELETE FROM categories WHERE id=$1 RETURNING *`, [id])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows
        },
    }
}