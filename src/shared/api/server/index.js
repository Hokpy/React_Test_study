import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import tasksRouter from './router/tasks.js'
import { prisma } from './prisma.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// API роуты — только задачи
app.use('/api/tasks', tasksRouter)

// Запуск
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`)
})

// Корректное завершение
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
