import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import useTaskLocalStorage from './useTasksLocalStorage'

const useTasks = () => {
  const { savedTasks, saveTasks } = useTaskLocalStorage()

  const [tasks, setTasks] = useState(savedTasks)

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const [searchQuery, setSearchQuery] = useState('')

  const newTaskInputRef = useRef(null)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are u sure want to delete this all task')

    if (isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId))
    },
    [tasks],
  )

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id == taskId) {
            return { ...task, isDone }
          }
          return task
        }),
      )
    },
    [tasks],
  )

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks((prevTasks) => [...prevTasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }
  }, [newTaskTitle])

  useEffect(() => saveTasks(tasks), [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, [])

  const filteredTasks = useMemo(() => {
    const cleanSearchQuery = searchQuery.trim().toLowerCase()
    return cleanSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(cleanSearchQuery),
        )
      : null
  }, [tasks, searchQuery])

  return {
    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toggleTaskComplete,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
  }
}
export default useTasks
