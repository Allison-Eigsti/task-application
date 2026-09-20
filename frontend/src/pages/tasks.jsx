import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //get stored todos
  useEffect(() => {
    fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  function handleEdit(id) {
    if (!user) {
      setError("Must login to edit a task");
      return;
    }

    setError("");
    navigate(`edit/${id}`);
  }

  function handleDetailView(id) {
    if (!user) {
      setError("Must login to view a task");
      return;
    }

    setError("");
    navigate(`task/${id}`);
  }

  function handleDeleteTask(id) {
    if (!user) {
      setError("Must login to delete a task");
      return;
    }

    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to delete task");
        }

        return response.json();
      })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        setError(error.message);
      });
  }

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
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Welcome{user ? `, ${user.name}` : ""}!
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Keep track of what needs to get done.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <svg
                className="mt-0.5 h-5 w-5 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>

              <div>
                <p className="font-medium">Something went wrong</p>
                <p className="mt-1 text-red-600">{error}</p>
              </div>
            </div>
          )}

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
                  onClick={() => handleDetailView(task._id)}
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
                  </div>

                  <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 justify-end">
                    {/* <button
                    onClick={() =>
                      handleChangeStatus(task._id, !task.status)
                    }
                    className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                  >
                    {task.status ? "Mark as Pending" : "Mark as Completed"}
                  </button> */}

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEdit(task._id);
                      }}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteTask(task._id);
                      }}
                      className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export default Tasks;
