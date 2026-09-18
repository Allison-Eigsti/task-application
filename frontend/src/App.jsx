import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/home'
import Register from './components/register'
import Login from './components/login'
import Tasks from './pages/tasks'


function App() {
  const location = useLocation()

  if (localStorage.getItem('token')) {
    if (["/login", "/register"].includes(location.pathname)) {
      window.location.href = '/'
    }
  } else {
    if (["/tasks"].includes(location.pathname)) {
      window.location.href='/login'
    }
  }

  function handleLogout() {
    localStorage.clear()
    window.location.href = '/login'
  }
 
  return (
    <>
      {/* Barra de navegación usando <Link> para evitar que la página se recargue */}
      <nav className="mb-6 flex flex-wrap items-center justify-left gap-4 bg-slate-900 px-5 py-4 text-slate-100 shadow-lg shadow-slate-400/10">
        <Link className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white" to="/">Home</Link>
        {localStorage.getItem('token') && (
          <Link className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white" to="/tasks">Tasks</Link>
        )}
        {!localStorage.getItem('token') && (
          <Link className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white" to="/login">Login</Link>
        )}
        {!localStorage.getItem('token') && (
          <Link className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white" to="/register">Register</Link>
        )}
        {localStorage.getItem('token') && (
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-700 hover:text-white"
          >
            Logout
          </button>
        )}
      </nav>
      {/* Defining the routes */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/tasks" element={<Tasks />}/>
      </Routes>
    </>
  )
}

export default App
