import TaskPage from './pages/TaskPage'
import Router from './Router/'
import TasksPage from './pages/TasksPage'

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <h1>404 Page not found</h1>,
  }
  return <Router routes={routes} />
}

export default App
