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

    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disapearingTaskId,
    apearingTaskId,
  } = useTasks()

  const { firstIncompleteTaskId, firstIncompleteTaskRef } =
    useUnCompleteTaskScroll(tasks)

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,

      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disapearingTaskId,
      apearingTaskId,
      firtsUnCompleteTaskId: firstIncompleteTaskId,
      firtsUnCompleteTaskRef: firstIncompleteTaskRef,
    }),
    [
      tasks,
      filteredTasks,
      deleteTask,
      deleteAllTasks,
      toggleTaskComplete,

      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disapearingTaskId,
      apearingTaskId,
      firstIncompleteTaskId,
      firstIncompleteTaskRef,
    ],
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
