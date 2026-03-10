export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>

      <form method="POST" action="/api/contact">
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" />
        <textarea name="message"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
