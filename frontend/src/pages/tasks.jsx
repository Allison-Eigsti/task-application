import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  //get stored todos
  useEffect(() => {
    fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  function handleEdit(id) {
    navigate(`edit/${id}`);
  }

  // function handleAddTask(event) {
  //   event.preventDefault();
  //   const name = event.target[0].value;
  //   const description = event.target[1].value;

  //   fetch(`${API_URL}/tasks`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your actual token
  //     },
  //     body: JSON.stringify({ name, description })
  //   })
  //   .then(response => response.json())
  //   .then(newTask => setTasks(prevTasks => [...prevTasks, newTask]))
  //   .catch(error => console.error('Error adding tasks:', error))
  // }

  // function handleDeleteTask(taskId) {
  //   console.log(222)
  //   fetch(`${API_URL}/tasks/${taskId}`, {
  //     method: 'delete',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your actual token
  //     }
  //   })
  //   .then(()=> setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)))
  //   .catch(error => console.error('Error deleting task:', error))
  // }

  // function handleChangeStatus(taskId, newStatus) {
  //   fetch(`${API_URL}/tasks/${taskId}`, {
  //     method: 'PUT',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your actual token
  //     },
  //     body: JSON.stringify({ status: newStatus })
  //   })
  //   .then(response => response.json())
  //   .then(updatedTask => {
  //     setTasks(prevTasks => prevTasks.map(task => task._id === taskId ? updatedTask : task))
  //   })
  //   .catch(error => console.error('Error updating task status:', error))
  // }

  return (
    <>
      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Tasks
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Keep track of what needs to get done.
            </p>
          </div>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">
                Task List
              </h2>

              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
              </span>
            </div>

            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Task content */}
                    <div className="min-w-0">
                      <h3
                        className={`text-base font-semibold ${
                          task.status
                            ? "text-slate-400 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {task.name}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {task.description}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        task.status
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
                          : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20"
                      }`}
                    >
                      {task.status ? "Completed" : "Pending"}
                    </span>

                    <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4"></div>
                    <button
                      onClick={() => handleEdit(task._id)}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                  </div>

                  {/* Actions
                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                  <button
                    onClick={() =>
                      handleChangeStatus(task._id, !task.status)
                    }
                    className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  >
                    {task.status ? "Mark as Pending" : "Mark as Completed"}
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </div> */}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      {/* <button 
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
                </button> */}

      {/* <section className="flex flex-col items-center justify-center bg-gray-100">
        <h2 className='text-2xl font-bold mb-4'>Add Task</h2>
          <form className='flex flex-col items-center' onSubmit={handleAddTask}>
            <input type="text" placeholder='Task Name' className='mb-2 p-2 border rounded' />
            <input type="text" placeholder='Task Description' className='mb-2 p-2 border rounded' />
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded'>Add Task</button>
          </form>
      </section> */}
    </>
  );
}

export default Tasks;
