import { memo, useContext } from 'react'

import { TodoItem, TasksContext } from '@/entities/todo'

const TodoList = (props) => {
  const { styles } = props
  const { tasks, filteredTasks } = useContext(TasksContext)

  const hasTask = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTask) {
    return <div className={styles.emptyMessage}> There are no tasks yet</div>
  }

  if (hasTask && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Task not found</div>
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.item}
          key={task.id}
          {...task}
        />
      ))}
    </ul>
  )
}

export default memo(TodoList)
