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

// ✅ FIX: CSP — ставим ПОСЛЕ всех middleware, удаляем старый заголовок перед установкой нового
app.use((req, res, next) => {
  res.removeHeader('Content-Security-Policy')
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: http://localhost:3001; connect-src 'self' http://localhost:3001 http://localhost:5173",
  )
  next()
})

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
