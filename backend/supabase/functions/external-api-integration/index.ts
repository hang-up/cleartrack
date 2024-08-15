import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import type { SupabaseClient } from "jsr:@supabase/supabase-js@2";

type Resource = "projects" | "resources" | "stakeholders" | "recommendations";
const isValidResource = (resource: string): resource is Resource => {
  return ["projects", "resources", "stakeholders", "recommendations"].includes(
    resource,
  );
};

interface RequestBody {
  resource: Resource;
  join?: string[];
  id?: string;
}

/**
 * Constructs a Supabase query builder with optional joins and ID filtering.
 */
const getQueryBuilder = (
  supabase: SupabaseClient<any, "public", any>,
  resource: Resource,
  join: string[] = [],
  id?: string,
) => {
  const queryFragments = new Map([
    ["resources", `,project_resource(resources(*))`],
    ["stakeholders", `,project_stakeholder(stakeholders(*))`],
    ["recommendations", `,recommendations(*)`],
  ]);
  const joinQuery = join
    .map((fragment) => queryFragments.get(fragment))
    .join(
      "",
    );

  const builder = supabase.from(resource).select(
    `*${joinQuery}`,
  );

  if (id) {
    builder.eq("id", id);
  }

  return builder;
};

/**
 * Edge function to handle external API integration.
 *
 * method: POST
 * path: /functions/v1/external-api-integration
 * body: { resource: string, join?: string[], id?: string }
 * example: { resource: "projects", join: ["resources", "stakeholders", "recommendations"], id: "1" }
 */
Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { resource, join, id } = await req.json() as RequestBody;

    if (!isValidResource(resource)) {
      throw new Error(
        "Missing or invalid resources.",
      );
    }

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
