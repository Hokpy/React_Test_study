import { memo, useContext } from 'react'

import { TasksContext } from '../context/TasksContext'
import TodoItem from './TodoItem'

const TodoList = () => {
  const { tasks, filteredTasks } = useContext(TasksContext)

  const hasTask = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTask) {
    return <div className="todo__empty-message"> There are no tasks yet</div>
  }

  if (hasTask && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Task not found</div>
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className="todo__item"
          key={task.id}
          {...task}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
