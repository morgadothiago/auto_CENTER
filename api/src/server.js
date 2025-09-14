import express from "express"
import "dotenv/config"
import publicRoutes from "./routes/publicRoutes.js    "

const PORT = 3333

const server = express()

server.use("/newContact", publicRoutes)

server.listen(process.env.PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
