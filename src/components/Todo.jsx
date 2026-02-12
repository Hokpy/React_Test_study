import { useContext } from 'react'

import { TasksContext } from '../context/TasksContext'
import AddTaskForm from './AddTaskForm'
import Button from './Button'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoLIst'

const Todo = () => {
  const { firtsUnCompleteTaskRef } = useContext(TasksContext)
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo />
      <Button
        onClick={() =>
          firtsUnCompleteTaskRef.current?.scrollIntoView({
            behavior: 'smooth',
          })
        }
      >
        Show first uncomplete task
      </Button>
      <TodoList />
    </div>
  )
}
export default Todo
