import TodoItem from './TodoItem'

const TodoList = (props) => {
  const { tasks = [] } = props

  const hasTask = true

  if (!hasTask) {
    return <div className="todo__empty-message"></div>
  }

  return (
    <ul className="todo__list">
      {tasks.map((task) => (
        <TodoItem
          className="todo__item"
          key={task.id}
          {...task}
        />
      ))}
    </ul>
  )
}

export default TodoList
