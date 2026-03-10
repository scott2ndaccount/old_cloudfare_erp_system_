
import { createFileRoute } from "@tanstack/react-router"
import { getSupabaseClient } from "../../lib/supabase"

export const Route = createFileRoute("/api/users")({
  server: {
    handlers: {

      // GET /api/users
      GET: async ({ context }) => {

        const supabase = getSupabaseClient(context.env)

        const { data, error } = await supabase
          .from("users")
          .select("*")

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
          )
        }

        return new Response(
          JSON.stringify(data),
          { headers: { "Content-Type": "application/json" } }
        )
      },


      // POST /api/users
      POST: async ({ request, context }) => {

        const supabase = getSupabaseClient(context.env)

        const body = await request.json()

        const { data, error } = await supabase
          .from("users")
          .insert(body)
          .select()

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
          )
        }

        return new Response(
          JSON.stringify(data),
          { headers: { "Content-Type": "application/json" } }
        )
      }

    }
  }
})
