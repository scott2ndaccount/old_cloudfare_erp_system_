export async function GET({ context }) {
  const response = await fetch(
    `${context.env.SUPABASE_URL}/rest/v1/`,
    {
      headers: {
        apikey: context.env.SUPABASE_KEY,
        Authorization: `Bearer ${context.env.SUPABASE_KEY}`
      }
    }
  )

  const data = await response.json()

  return Response.json(data)
}
