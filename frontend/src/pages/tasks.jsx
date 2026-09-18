import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;

function Tasks() {
  const [ tasks, setTasks] = useState([])

  //get stored todos
  useEffect(() => {
    fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your actual token
      }
    })
    .then(response => response.json())
    .then(data => setTasks(data))
    .catch(error => console.error('Error fetching tasks:', error)) 
  }, []);

  function handleAddTask(event) {
    event.preventDefault();
    const name = event.target[0].value;
    const description = event.target[1].value;

    fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your actual token       
      },
      body: JSON.stringify({ name, description })
    })
    .then(response => response.json())
    .then(newTask => setTasks(prevTasks => [...prevTasks, newTask]))
    .catch(error => console.error('Error adding tasks:', error))
  }


function handleDeleteTask(taskId) {
  console.log(222)
  fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your actual token    
    }
  })
  .then(()=> setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)))
  .catch(error => console.error('Error deleting task:', error))
}

function handleChangeStatus(taskId, newStatus) {
  fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your actual token        
    },
    body: JSON.stringify({ status: newStatus })
  })
  .then(response => response.json())
  .then(updatedTask => {
    setTasks(prevTasks => prevTasks.map(task => task._id === taskId ? updatedTask : task))
  })
  .catch(error => console.error('Error updating task status:', error))
}

  return (
    <>
    <main className="flex flex-col items-center min-h-screen justify-center bg-gray-100">
      <h1 className="text-3xl font-bold underline">
        Tasks
      </h1>
      <section className='flex flex-col items-center bg-gray-100'>
        <h2 className='text-2xl font-bold mb-4'>List Task</h2>
        <ul className='mt-4'>
          {tasks.map(task => (
            <li key={task._id} className='flex flex-col items-center bg-white mb-2'>
                {task.name}
                <p className='text-sm text-gray-500 mb-2'>{task.description}</p>
                {
                  task.status ?
                  ( <span className='text-xs'>Completed</span>)
                  :
                  ( <span className='text-xs'>Pending</span>)
                }
                <button 
                onClick={() => handleChangeStatus(task._id, !task.status)}
                className='bg-green-500 text-white px-4 py-2 rounded mt-2'
                >
                  {task.status ? 'Mark as Pending' : 'Mark as Completed'}
                </button>

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className='bg-red-500 text-white px-4 py-2 rounded mt-2'
                >
                  Delete
                </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col items-center justify-center bg-gray-100">
        <h2 className='text-2xl font-bold mb-4'>Add Task</h2>
          <form className='flex flex-col items-center' onSubmit={handleAddTask}>
            <input type="text" placeholder='Task Name' className='mb-2 p-2 border rounded' />
            <input type="text" placeholder='Task Description' className='mb-2 p-2 border rounded' />
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded'>Add Task</button>
          </form>
      </section>
    </main>
    </>
  )
}

export default Tasks
