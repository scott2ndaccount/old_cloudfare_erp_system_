import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/api/supabase")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(
          JSON.stringify({ status: "API working" }),
          {
            headers: { "Content-Type": "application/json" }
          }
        )
      }
    }
  }
})
