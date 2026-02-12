import { useContext, useState } from 'react'

import { TasksContext } from '../context/TasksContext'
import Button from './Button'
import Field from './Field'

const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext)

  const clearTaskTitle = newTaskTitle.trim()
  const isNewTaskTitleEmpty = clearTaskTitle.length === 0

  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (!isNewTaskTitleEmpty) {
      addTask(clearTaskTitle)
    }
  }

  const onInput = (event) => {
    const { value } = event.target

    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0
    setNewTaskTitle(value)
    setError(hasOnlySpaces ? `the task can't be empty` : '')
  }
  return (
    <form
      className="todo__form"
      onSubmit={onSubmit}
    >
      <Field
        className="todo__field"
        label="New task title"
        id="new-task"
        value={newTaskTitle}
        onInput={onInput}
        ref={newTaskInputRef}
        error={error}
      />
      <Button
        type="submit"
        isDisabled={isNewTaskTitleEmpty}
      >
        Add
      </Button>
    </form>
  )
}

export default AddTaskForm
