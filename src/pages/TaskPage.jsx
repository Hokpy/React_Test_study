import { useEffect, useState } from 'react'
import tasksAPI from '../api/tasksAPI'

const TaskPage = (props) => {
  const { params } = props
  const id = params.id
  const [task, setTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    tasksAPI
      .getById(id)
      .then((taskData) => {
        setTask(taskData)
        setError(false)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Done' : 'Not done'}</p>
    </div>
  )
}

export default TaskPage
