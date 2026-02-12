import { createContext } from 'react'

import useTasks from '../hooks/useTasks'
import useUnCompleteTaskScroll from '../hooks/useUnCompleteTaskScroll'

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const {
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
  } = useTasks()

  const { firtsUnCompleteTaskId, firtsUnCompleteTaskRef } =
    useUnCompleteTaskScroll(tasks)

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firtsUnCompleteTaskRef,
        firtsUnCompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
