import { useContext } from 'react'

import { TasksContext } from '@/entities/todo'
import AddTaskForm from '@/features/add-task'
import Button from '@/shared/ui/Button'
import SearchTaskForm from '@/features/search-task'
import TodoInfo from '@/features/stats'
import { TodoList } from '@/entities/todo'
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
