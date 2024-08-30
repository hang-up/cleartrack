import { corsHeaders } from "../_shared/cors.ts";
import { getQueryBuilder } from "../_shared/get-query-builder.ts";
import { getClient } from "../_shared/client.ts";

/**
 * Edge function to handle external requests to fetch resources.
 *
 * method: POST
 * path: /functions/v1/resources
 * query params: { id?: string }
 * example:
 * /functions/v1/resources
 * /functions/v1/resources?id=1
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resource = "resources";
    const join = ["project_details"];
    const id = new URL(req.url).searchParams.get("id");

    const supabase = getClient(req);
    const { data, error } = await getQueryBuilder(supabase, resource, join, id);

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        data,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain",
      },
      status: 500,
    });
  }
});
