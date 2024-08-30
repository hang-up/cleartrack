import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { getQueryBuilder } from "../_shared/get-query-builder.ts";

/**
 * Edge function to handle external requests to fetch projects.
 *
 * method: POST
 * path: /functions/v1/projects
 * query params: { id?: string }
 * example:
 * /functions/v1/projects
 * /functions/v1/projects?id=1
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const resource = "projects";
    const join = ["resource_details", "stakeholder_details", "recommendations"];
    const id = new URL(req.url).searchParams.get("id");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

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
