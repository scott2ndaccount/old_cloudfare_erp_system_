export async function GET() {
  return new Response(
    JSON.stringify({ status: "API working" }),
    {
      headers: { "Content-Type": "application/json" }
    }
  )
}
