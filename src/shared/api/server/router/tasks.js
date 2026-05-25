import { Router } from 'express'
import { prisma } from '../prisma.js'
import { Prisma } from '@prisma/client'

const router = Router()

// GET /api/tasks — список всех задач
router.get('/', async (req, res) => {
  try {
    const { completed, priority } = req.query

    const where = {}
    if (completed !== undefined) where.completed = completed === 'true'
    if (priority) where.priority = priority

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    res.json({ data: tasks, total: tasks.length })
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера', details: err.message })
  }
})

// GET /api/tasks/:id — одна задача
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task) return res.status(404).json({ error: 'Задача не найдена' })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера', details: err.message })
  }
})

// POST /api/tasks — создать задачу
router.post('/', async (req, res) => {
  const { title, description, priority } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Поле title обязательно' })
  }

  try {
    const task = await prisma.task.create({
      data: { title, description, priority: priority || 'medium' },
    })
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ error: 'Ошибка создания задачи' })
  }
})

// PUT /api/tasks/:id — обновить задачу
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, description, completed, priority } = req.body

  try {
    const task = await prisma.task.update({
      where: { id },
      data: { title, description, completed, priority },
    })
    res.json(task)
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2025'
    ) {
      return res.status(404).json({ error: 'Задача не найдена' })
    }
    res.status(500).json({ error: 'Ошибка сервера', details: err.message })
  }
})

// DELETE /api/tasks/:id — удалить задачу
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    await prisma.task.delete({ where: { id } })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера', details: err.message })
  }
})

export default router
