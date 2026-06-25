import express from "express"
import "dotenv/config"
import { authRouter } from "./routes/auth.route"
import { errorHandler } from "./middlewares/errorHandler"
import { vocabRouter } from "./routes/vocab.route"
import { auth } from "./middlewares/auth"
import cors from "cors"

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api/auth",authRouter)
app.use("/api/vocab",auth,vocabRouter)

app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))