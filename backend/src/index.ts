import express from "express"
import "dotenv/config"
import { authRouter } from "./routes/auth.route"
import { errorHandler } from "./middlewares/errorHandler"
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/auth",authRouter)

app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))