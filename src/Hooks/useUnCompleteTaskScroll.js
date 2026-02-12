import { useRef } from 'react'

const useUnCompleteTaskScroll = (tasks) => {
  const firtsUnCompleteTaskRef = useRef(null)

  const firtsUnCompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

  return { firtsUnCompleteTaskId, firtsUnCompleteTaskRef }
}

export default useUnCompleteTaskScroll
