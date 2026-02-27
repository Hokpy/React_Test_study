import { createContext, useMemo } from 'react'

import useTasks from './useTasks'
import useUnCompleteTaskScroll from './useUnCompleteTaskScroll'

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
    disapearingTaskId,
    apearingTaskId,
  } = useTasks()

  const { firtsUnCompleteTaskId, firtsUnCompleteTaskRef } =
    useUnCompleteTaskScroll(tasks)

  const value = useMemo(
    () => ({
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
      disapearingTaskId,
      apearingTaskId,
      firtsUnCompleteTaskId,
      firtsUnCompleteTaskRef,
    }),
    [
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
      disapearingTaskId,
      apearingTaskId,
      firtsUnCompleteTaskId,
      firtsUnCompleteTaskRef,
    ],
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
