import { pool } from "../configs/pg"

export default function practiceRepo () {
    return {
        getQuestionQuery: async (id:number[],inggris:boolean=true) =>{
            if(inggris){
                const vocab = await pool.query(`SELECT english FROM vocab WHERE id=ANY($1)`,[id])
                return vocab.rows
            } else {
                const vocab = await pool.query(`SELECT indonesia FROM vocab WHERE id=ANY($1)`,[id])
                return vocab.rows
            }
        }
    }
}