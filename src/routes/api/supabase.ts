import { createFileRoute } from '@tanstack/react-router'
import { getSupabaseClient } from '@/lib/supabase'

export const Route = createFileRoute('/api/supabase')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const supabase = getSupabaseClient()

          const { data, error } = await supabase.from('test').select('*').limit(5)

          if (error) {
            return Response.json(
              { status: 'error', message: error.message, code: error.code },
              { status: 400 },
            )
          }

          return Response.json({ status: 'connected', data })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          return Response.json({ status: 'error', message }, { status: 500 })
        }
      },
    },
  },
})
