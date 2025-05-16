import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

import registerRoutes from './routes/index.js'
registerRoutes(app)

export default app
