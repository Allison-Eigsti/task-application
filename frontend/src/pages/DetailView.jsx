import { useLoaderData, useNavigate } from "react-router-dom";

function DetailView() {
  const task = useLoaderData()

  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-slate-400">
            Task details
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            {task.name}
          </h1>
        </div>

        {/* Task card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Description */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Description
            </p>

            <p className="text-base leading-7 text-slate-600">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Status */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <label
              htmlFor="status"
              className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Status
            </label>

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

          {/* Actions */}
          <div className="flex flex-col gap-3 bg-slate-50/70 p-6 sm:flex-row sm:justify-end sm:p-8">
            <button
                onClick={() => navigate('/')}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Return to Tasks
            </button>

            <button
            onClick={() => navigate(`/edit/${task._id}`)}
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailView;
