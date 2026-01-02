import express from "express"
import cors from "cors"
import router from "./routes/quoteRoutes"

const server = express()

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.send("Quotes Management Application Backend")
})

server.use("/api/quotes", router)

export default server
