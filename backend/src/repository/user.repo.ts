import { pool } from "../configs/pg"

export default function userRepository(){
    return {
        getUserById: async (id:number)=>{
            const item = await pool.query<User>(`SELECT users.id,users.username,COUNT(vocab.english) as total_vocab FROM users JOIN vocab ON vocab.user_id = users.id WHERE vocab.user_id=$1 GROUP BY users.id`,[id])
            if(item.rows.length==0) return null
            return item.rows
        },
        getUserByUsername: async (username:string)=>{
            const item = await pool.query<User>(`SELECT * FROM users WHERE username=$1`,[username])
            if(item.rows.length==0) return null
            return item.rows
        },
        registerQuery: async (username: string, password: string)=>{
            const item = await pool.query<User>(`INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *`,[username,password])
            if(item.rows.length==0) return null
            return item.rows
        }
    }
}