import { NavLink, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

import Register from './components/register'
import Login from './components/login'

import Tasks from './pages/tasks'
import NewTask from './pages/NewTask'

import PageNotFound from './pages/PageNotFound';
import ErrorPage from './pages/ErrorPage'

function Layout() {

  function handleLogout() {
    localStorage.clear()
    window.location.href = '/login'
  }
 
  return (
    <>
      <nav className="mb-6 flex flex-wrap items-center justify-left gap-4 bg-slate-900 px-5 py-4 text-slate-100 shadow-lg shadow-slate-400/10">

        <NavLink
          className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white"
          to="/"
        >
          Tasks
        </NavLink>

        {!localStorage.getItem('token') && (
          <>
            <NavLink
              className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white"
              to="/login"
            >
              Login
            </NavLink>

            <NavLink
              className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white"
              to="/register"
            >
              Register
            </NavLink>
          </>
        )}

        {localStorage.getItem('token') && (
          <>
            <NavLink
              className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white"
              to="/new-task"
            >
              New Task
            </NavLink>

            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white"
            >
              Logout
            </button>
          </>
        )}

      </nav>

      <div className="p-4">
        <Outlet />
      </div>
    </>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Tasks />,
        // loader: async ({ params }) => {
        // return fetch(``).then(res => res.json())
        // }, 
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'new-task',
        element: <NewTask />
      },
      {
        path: '*',
        element: <PageNotFound />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}  fallbackElement={<hr />}/>;

}

export default App
