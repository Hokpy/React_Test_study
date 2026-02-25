import { useContext } from 'react'

import { TasksContext } from '../../context/TasksContext'
import AddTaskForm from '../AddTaskForm/AddTaskForm'
import Button from '../Button/Button'
import SearchTaskForm from '../SearchTaskForm/SearchTaskForm'
import TodoInfo from '../TodoInfo/TodoInfo'
import TodoList from '../TodoList/TodoLIst'
import styles from './Todo.module.scss'

const Todo = () => {
  const { firtsUnCompleteTaskRef } = useContext(TasksContext)
  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <TodoInfo styles={styles} />
      <Button
        onClick={() =>
          firtsUnCompleteTaskRef.current?.scrollIntoView({
            behavior: 'smooth',
          })
        }
      >
        Show first uncomplete task
      </Button>
      <TodoList styles={styles} />
    </div>
  )
}
export default Todo
