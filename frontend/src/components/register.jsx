import {useState} from 'react'
const API_URL = import.meta.env.VITE_API_URL;


function Register() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${API_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken)
                window.location.href = '/tasks'
            }
        })
        .catch(error => console.error('Error registering user:', error))
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-[0_20px_80px_rgba(15,23,42,0.12)]">
        <h2 className="mb-6 text-3xl font-semibold text-slate-900">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    )
}

export default Register
