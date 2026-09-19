import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function NewTask() {
  const [error, setError] = useState("");

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create task');
      }

      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error)
      setError(error.message)
    }
  }

  return (
    <>
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            New Task
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Give your new task a title and description.
          </p>
        </div>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">New Task</h2>
          </div>
        </section>

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
            placeholder="Title"
            ref={nameRef}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
          />
          <textarea
            placeholder="Description"
            ref={descriptionRef}
            rows={4}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-700"
          >
            Save Task
          </button>
        </form>
      </div>
    </main>
    </>
  )
}

export default NewTask
