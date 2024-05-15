create type "public"."project_status" as enum ('planned', 'active', 'on_hold', 'delayed', 'completed', 'cancelled', 'in_review', 'pending_approval');

create table "public"."management_response_actions" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "action_plan" text,
    "deliverables" text,
    "expected_completion_date" timestamp with time zone
);


alter table "public"."management_response_actions" enable row level security;

create table "public"."projects" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "name" character varying not null,
    "description" text,
    "start_date" timestamp with time zone not null,
    "end_date" timestamp with time zone not null,
    "committee_presentation_date" date not null,
    "publication_date" date not null,
    "project_status" project_status not null
);


alter table "public"."projects" enable row level security;

create table "public"."recommendations" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "body" text
);


alter table "public"."recommendations" enable row level security;

CREATE UNIQUE INDEX management_response_actions_pkey ON public.management_response_actions USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX recommendations_pkey ON public.recommendations USING btree (id);

alter table "public"."management_response_actions" add constraint "management_response_actions_pkey" PRIMARY KEY using index "management_response_actions_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."recommendations" add constraint "recommendations_pkey" PRIMARY KEY using index "recommendations_pkey";

alter table "public"."recommendations" add constraint "public_recommendations_id_fkey" FOREIGN KEY (id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."recommendations" validate constraint "public_recommendations_id_fkey";

grant delete on table "public"."management_response_actions" to "anon";

grant insert on table "public"."management_response_actions" to "anon";

grant references on table "public"."management_response_actions" to "anon";

grant select on table "public"."management_response_actions" to "anon";

grant trigger on table "public"."management_response_actions" to "anon";

grant truncate on table "public"."management_response_actions" to "anon";

grant update on table "public"."management_response_actions" to "anon";

grant delete on table "public"."management_response_actions" to "authenticated";

grant insert on table "public"."management_response_actions" to "authenticated";

grant references on table "public"."management_response_actions" to "authenticated";

grant select on table "public"."management_response_actions" to "authenticated";

grant trigger on table "public"."management_response_actions" to "authenticated";

grant truncate on table "public"."management_response_actions" to "authenticated";

grant update on table "public"."management_response_actions" to "authenticated";

grant delete on table "public"."management_response_actions" to "service_role";

grant insert on table "public"."management_response_actions" to "service_role";

grant references on table "public"."management_response_actions" to "service_role";

grant select on table "public"."management_response_actions" to "service_role";

grant trigger on table "public"."management_response_actions" to "service_role";

grant truncate on table "public"."management_response_actions" to "service_role";

grant update on table "public"."management_response_actions" to "service_role";

grant delete on table "public"."projects" to "anon";

grant insert on table "public"."projects" to "anon";

grant references on table "public"."projects" to "anon";

grant select on table "public"."projects" to "anon";

grant trigger on table "public"."projects" to "anon";

grant truncate on table "public"."projects" to "anon";

grant update on table "public"."projects" to "anon";

grant delete on table "public"."projects" to "authenticated";

grant insert on table "public"."projects" to "authenticated";

grant references on table "public"."projects" to "authenticated";

grant select on table "public"."projects" to "authenticated";

grant trigger on table "public"."projects" to "authenticated";

grant truncate on table "public"."projects" to "authenticated";

grant update on table "public"."projects" to "authenticated";

grant delete on table "public"."projects" to "service_role";

grant insert on table "public"."projects" to "service_role";

grant references on table "public"."projects" to "service_role";

grant select on table "public"."projects" to "service_role";

grant trigger on table "public"."projects" to "service_role";

grant truncate on table "public"."projects" to "service_role";

grant update on table "public"."projects" to "service_role";

grant delete on table "public"."recommendations" to "anon";

grant insert on table "public"."recommendations" to "anon";

grant references on table "public"."recommendations" to "anon";

grant select on table "public"."recommendations" to "anon";

grant trigger on table "public"."recommendations" to "anon";

grant truncate on table "public"."recommendations" to "anon";

grant update on table "public"."recommendations" to "anon";

grant delete on table "public"."recommendations" to "authenticated";

grant insert on table "public"."recommendations" to "authenticated";

grant references on table "public"."recommendations" to "authenticated";

grant select on table "public"."recommendations" to "authenticated";

grant trigger on table "public"."recommendations" to "authenticated";

grant truncate on table "public"."recommendations" to "authenticated";

grant update on table "public"."recommendations" to "authenticated";

grant delete on table "public"."recommendations" to "service_role";

grant insert on table "public"."recommendations" to "service_role";

grant references on table "public"."recommendations" to "service_role";

grant select on table "public"."recommendations" to "service_role";

grant trigger on table "public"."recommendations" to "service_role";

grant truncate on table "public"."recommendations" to "service_role";

grant update on table "public"."recommendations" to "service_role";

