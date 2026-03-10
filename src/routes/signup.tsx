import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Signup() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function handleSignup(e:any){
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      alert(error.message)
    } else {
      alert("Account created")
    }
  }

  return (
    <form onSubmit={handleSignup}>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <button>Create Account</button>
    </form>
  )
}
