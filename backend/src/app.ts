import express from "express"
import cors from "cors"
import server from "./server"
import dotenv from "dotenv"
import connectDB from "./config/db"

dotenv.config()

connectDB()

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})
