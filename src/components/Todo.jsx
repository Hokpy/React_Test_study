import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoLIst';

const Todo = () => {
  const tasks = [
    { id: 'task-1', title: 'Купить молока', isDone: false },
    { id: 'task-2', title: 'Купить кота', isDone: true },
  ]

  const deleteAllTasks = () => {
    console.log('deleete all task')
  }

  const deleteTask = (taskId) => {
    console.log(`delete task ${taskId}`)
  }

  const toggleTaskComplete = (taskId, isDone) => {
    console.log(`задача ${taskId}, ${isDone ? 'asdas' : 'donst'}`)
  }

  const filterTasks = (query) => {
    console.log(`Search ${query}`)
  }

  const addTask = () => {
    console.log('Create Task')
  }

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask} />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({ isDone }) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}
export default Todo
