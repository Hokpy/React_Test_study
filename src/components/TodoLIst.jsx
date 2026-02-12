import { memo } from 'react'

import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
    filteredTasks,
    firtsUnCompleteTaskId,
    firtsUnCompleteTaskRef,
  } = props

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
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          ref={
            task.id === firtsUnCompleteTaskId ? firtsUnCompleteTaskRef : null
          }
          onTaskCompleteChange={onTaskCompleteChange}
          {...task}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
