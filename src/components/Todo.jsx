import { useEffect, useRef, useState } from 'react'

import AddTaskForm from './AddTaskForm'
import Button from './Button'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoLIst'

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return [
      { id: 'task-1', title: 'Купить молока', isDone: false },
      { id: 'task-2', title: 'Купить кота', isDone: true },
    ]
  })

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const [searchQuery, setSearchQuery] = useState('')

  const newTaskInputRef = useRef(null)

  const firtsUnCompleteTaskRef = useRef(null)

  const firtsUnCompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

  const deleteAllTasks = () => {
    const isConfirmed = confirm('Are u sure want to delete this all task')

    if (isConfirmed) {
      setTasks([])
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id == taskId) {
          return { ...task, isDone }
        }
        return task
      }),
    )
  }

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      }

      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    }
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  }, [])

  const cleanSearchQuery = searchQuery.trim().toLowerCase()

  const filteredTasks =
    cleanSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(cleanSearchQuery),
        )
      : null

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <Button
        onClick={() =>
          firtsUnCompleteTaskRef.current?.scrollIntoView({
            behavior: 'smooth',
          })
        }
      >
        Show first uncomplete task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        firtsUnCompleteTaskRef={firtsUnCompleteTaskRef}
        firtsUnCompleteTaskId={firtsUnCompleteTaskId}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}
export default Todo
