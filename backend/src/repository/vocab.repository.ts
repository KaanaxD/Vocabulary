import { pool } from "../configs/pg"

export default function vocabRepository() {
    return {
        getAllVocabQuery: async (user_id: number, page: number, limit: number): Promise<{ data: Vocab[], pagination: Pagination } | null> => {
            const offset = (page - 1) * limit
            const vocab = await pool.query(`SELECT * FROM vocab WHERE user_id = $1 LIMIT $2 OFFSET $3`, [user_id, limit, offset])
            const totalItem = await pool.query(`SELECT COUNT(*) FROM vocab WHERE user_id = $1`, [user_id])
            const totalPage = Math.ceil(Number(totalItem.rows[0]) / limit)
            if (!vocab) {
                return null
            }
            return {
                data: vocab.rows,
                pagination: {
                    page: page,
                    limit: limit,
                    totalPage: totalPage,
                    totalItem: Number(totalItem)
                }
            }
        },
        getVocabByIdQuery: async (id: number): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`SELECT * FROM vocab WHERE id = $1`, [id])
            if (!vocab) {
                return null
            }
            return vocab.rows;
        },
        addVocabQuery: async (user_id: number, indonesia: string, inggris: string): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`INSERT INTO vocab (user_id,indonesia,english) VALUES ($1,$2,$3) RETURNING *`, [user_id, indonesia, inggris])
            if (!vocab) {
                return null
            }
            return vocab.rows
        },
        editVocabQuery: async (id: number, indonesia: string, inggris: string): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`UPDATE vocab SET indonesia=$1, english=$2 WHERE ID = $3 RETURNING *`, [indonesia, inggris, id])
            if (!vocab) {
                return null
            }
            return vocab.rows
        },
        deleteVocabQuery: async (id: number): Promise<Vocab[] | null> => {
            const vocab = await pool.query(`DELETE FROM vocab WHERE id=$1 AND RETURNING *`, [id])
            if (!vocab) {
                return null
            }
            return vocab.rows
        }
    }
}