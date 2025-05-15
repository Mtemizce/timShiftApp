import app from './app.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.BACKEND_PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Backend API http://localhost:${PORT}`)
})
