import { useLoaderData, useNavigate } from "react-router-dom";
import { useRef, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL;


function EditTask() {
  const [error, setError] = useState("");

  const task = useLoaderData()

  const nameRef = useRef(null)
  const descriptionRef = useRef(null)
  const statusRef = useRef(null)

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const status = statusRef.current.value

    try {
        const response = await fetch(`${API_URL}/tasks/${task._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ name, description, status }),
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to edit task');
      }

      navigate('/')
    } catch (error) {
        console.error("Error updating task:", error)
        setError(error.message)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Edit Task
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update your task details.
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            defaultValue={task.name}
            ref={nameRef}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <textarea
            defaultValue={task.description}
            ref={descriptionRef}
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />

          <select
                defaultValue={task.status ? "true" : "false"}
                ref={statusRef}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                >
                <option value="false">Pending</option>
                <option value="true">Completed</option>
            </select>


          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-700"
          >
            Save Changes
          </button>
        </form>

      </div>
    </main>
  );
}

export default EditTask;