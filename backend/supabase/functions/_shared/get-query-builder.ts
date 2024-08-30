import type { SupabaseClient } from "jsr:@supabase/supabase-js@2";
type Resource = "projects" | "resources" | "stakeholders" | "recommendations";

const isValidResource = (resource: string): resource is Resource => {
  return ["projects", "resources", "stakeholders", "recommendations"].includes(
    resource,
  );
};

/**
 * Constructs a Supabase query builder with optional joins and ID filtering.
 */
const getQueryBuilder = (
  supabase: SupabaseClient<any, "public", any>,
  resource: Resource,
  join: string[] = [],
  id?: string | null,
) => {
  const queryFragments = new Map([
    ["project_details", ",project_resource(projects(*))"],
    ["resource_details", `,project_resource(resources(*))`],
    ["stakeholder_details", `,project_stakeholder(stakeholders(*))`],
    ["stakeholder_projects", `,project_stakeholder(projects(*))`],
    ["recommendations", `,recommendations(*)`],
    ["projects", ",projects(*)"],
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

export { getQueryBuilder, isValidResource };
