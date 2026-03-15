import { createFileRoute } from '@tanstack/react-router'
import { getSupabaseClient } from '@/lib/supabase'

export const Route = createFileRoute('/api/supabase')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const table = url.searchParams.get('table')

        // Step 1: Check env vars exist
        const supabaseUrl = process.env.SUPABASE_URL
        const supabaseKey = process.env.SUPABASE_KEY

        if (!supabaseUrl || !supabaseKey) {
          return Response.json(
            {
              status: 'error',
              step: 'env_check',
              message: 'Missing environment variables',
              details: {
                SUPABASE_URL: supabaseUrl ? 'set' : 'MISSING',
                SUPABASE_KEY: supabaseKey ? 'set' : 'MISSING',
              },
              fix: 'Add SUPABASE_URL and SUPABASE_KEY to .dev.vars (local) or wrangler secrets (production)',
            },
            { status: 500 },
          )
        }

        // Step 2: Create client
        let supabase
        try {
          supabase = getSupabaseClient()
        } catch (err) {
          return Response.json(
            {
              status: 'error',
              step: 'client_creation',
              message: err instanceof Error ? err.message : 'Failed to create Supabase client',
              supabaseUrl,
            },
            { status: 500 },
          )
        }

        // Step 3: Test connection
        try {
          const { data: authData, error: authError } = await supabase.auth.getSession()

          const healthCheck = {
            status: 'connected',
            supabaseUrl,
            auth: authError
              ? { error: authError.message, code: authError.code }
              : { session: authData.session ? 'active' : null },
          }

          // Step 4: Query table if requested
          if (table) {
            const { data, error, status, statusText } = await supabase
              .from(table)
              .select('*')
              .limit(10)

            if (error) {
              return Response.json(
                {
                  status: 'error',
                  step: 'table_query',
                  table,
                  message: error.message,
                  code: error.code,
                  hint: error.hint || null,
                  details: error.details || null,
                  httpStatus: status,
                  httpStatusText: statusText,
                  connection: healthCheck,
                },
                { status: 400 },
              )
            }

            return Response.json({
              status: 'ok',
              table,
              rowCount: data.length,
              data,
              connection: healthCheck,
            })
          }

          return Response.json(healthCheck)
        } catch (err) {
          return Response.json(
            {
              status: 'error',
              step: 'connection_test',
              message: err instanceof Error ? err.message : 'Unknown error',
              stack: err instanceof Error ? err.stack?.split('\n').slice(0, 3) : undefined,
              supabaseUrl,
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
