import { pool } from "../configs/pg"

export default function vocabRepository() {
    return {
        getAllVocabQuery: async (user_id: number, page: number, limit: number): Promise<{ vocab: Vocab[], pagination: Pagination } | null> => {
            const offset = (page - 1) * limit
            const vocab = await pool.query(`SELECT * FROM vocab WHERE user_id = $1  ORDER BY added_at DESC LIMIT $2 OFFSET $3 `, [user_id, limit, offset])
            const totalItem = await pool.query(`SELECT COUNT(*) FROM vocab WHERE user_id = $1`, [user_id])
            const totalPage = Math.ceil(Number(totalItem.rows[0].count) / limit)
            return {
                vocab: vocab.rows,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    totalPage: totalPage,
                    totalItem: Number(totalItem.rows[0].count)
                }
            }
        },
        getVocabByIdQuery: async (id: number): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`SELECT * FROM vocab WHERE id = $1`, [id])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows;
        },

        getVocabByCategoryIdQuery: async (category_id: number): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`SELECT * FROM vocab WHERE category_id = $1`, [category_id])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows
        },

        addVocabQuery: async (user_id: number, indonesia: string, english: string, category_id: number): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`INSERT INTO vocab (user_id,indonesia,english,category_id) VALUES ($1,$2,$3,$4) RETURNING *`, [user_id, indonesia, english, category_id])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows
        },
        editVocabQuery: async (id: number, indonesia: string, english: string, category_id: number): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`UPDATE vocab SET indonesia=$1, english=$2, categorya_id=$3 WHERE ID = $4 RETURNING *`, [indonesia, english, category_id, id])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows
        },
        deleteVocabQuery: async (id: number): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`DELETE FROM vocab WHERE id=$1 RETURNING *`, [id])
            if (vocab.rows.length == 0) {
                return null
            }
            return vocab.rows
        }
    }
}