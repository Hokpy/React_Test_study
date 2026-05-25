const URL = 'http://localhost:3001/api/tasks'

const headers = {
  'Content-Type': 'application/json',
}

const tasksAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json())
  },

  getById: (id) => {
    return fetch(`${URL}/${id}`).then((response) => response.json())
  },

  add: (task) => {
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json())
  },

  delete: (id) => {
    return fetch(`${URL}/${id}`, { method: 'DELETE' })
  },

  deleteAll: (tasks) => {
    return Promise.all(tasks.map(({ id }) => tasksAPI.delete(id)))
  },

  toggleComplete: (id, completed) => {
    return fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ completed }),
    })
  },
}

export default tasksAPI
