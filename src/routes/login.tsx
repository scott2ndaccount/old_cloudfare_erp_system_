import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e:any) {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Logged in!")
      window.location.href = "/"
    }
  }

  return (
    <div>

      <h1>ERP Login</h1>

      <form onSubmit={handleLogin}>

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>

    </div>
  )
}
