export async function GET({ context }) {
  try {
    const response = await fetch(
      `${context.env.SUPABASE_URL}/rest/v1/`,
      {
        method: "GET",
        headers: {
          apikey: context.env.SUPABASE_KEY,
          Authorization: `Bearer ${context.env.SUPABASE_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to connect to Supabase",
        message: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
