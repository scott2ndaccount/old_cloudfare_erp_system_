import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.id })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // placeholder for actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // on success redirect to dashboard
      navigate({ to: '/' })
    } catch (err) {
      // show generic invalid error for now
      setError('Invalid login credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <form
        className="bg-slate-800 p-8 rounded-lg w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl text-white mb-6 text-center">Login</h2>

        {error && (
          <p className="mb-4 text-red-400 text-center">{error}</p>
        )}

        <label className="block mb-4">
          <span className="text-gray-300">Email / Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="mt-1 block w-full rounded-md bg-slate-700 text-white px-3 py-2 focus:outline-none"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-300">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="mt-1 block w-full rounded-md bg-slate-700 text-white px-3 py-2 focus:outline-none"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
