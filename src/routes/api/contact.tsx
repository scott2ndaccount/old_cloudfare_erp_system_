export default function Contact() {

  async function handleSubmit(e) {
    e.preventDefault()

    const form = new FormData(e.target)

    const data = {
      name: form.get("name"),
      email: form.get("email")
    }

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit">Send</button>
    </form>
  )
}
