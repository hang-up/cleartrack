create type "public"."recommendation_status" as enum ('late', 'closed', 'upcoming', 'overdue');

create type "public"."roles" as enum ('admin');

create table "public"."management_response_submission" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "management_response_action_id" bigint not null,
    "submission_date" timestamp with time zone not null,
    "submission_details" text,
    "submission_type" text not null,
    "submitting_internal_division" bigint not null,
    "submitting_stakeholder" text not null
);


alter table "public"."management_response_submission" enable row level security;

create table "public"."profiles" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "cuid" bigint not null,
    "uuid" bigint not null,
    "email" text not null
);


alter table "public"."profiles" enable row level security;

create table "public"."project_resource" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "project_id" bigint,
    "resource_id" bigint
);


alter table "public"."project_resource" enable row level security;

create table "public"."project_types" (
    "id" bigint generated by default as identity not null,
    "name" text not null
);


alter table "public"."project_types" enable row level security;

create table "public"."resources" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "name" text not null,
    "role" text
);


alter table "public"."resources" enable row level security;

alter table "public"."management_response_actions" add column "accountability" text;

alter table "public"."management_response_actions" add column "status" text;

alter table "public"."projects" drop column "project_status";

alter table "public"."projects" add column "project_type_id" bigint not null;

alter table "public"."projects" add column "status" project_status not null;

alter table "public"."recommendations" add column "status" recommendation_status not null;

CREATE UNIQUE INDEX management_response_submission_pkey ON public.management_response_submission USING btree (id);

CREATE UNIQUE INDEX profiles_cuid_key ON public.profiles USING btree (cuid);

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_uuid_key ON public.profiles USING btree (uuid);

CREATE UNIQUE INDEX project_resource_pkey ON public.project_resource USING btree (id);

CREATE UNIQUE INDEX project_types_pkey ON public.project_types USING btree (id);

CREATE UNIQUE INDEX resources_pkey ON public.resources USING btree (id);

alter table "public"."management_response_submission" add constraint "management_response_submission_pkey" PRIMARY KEY using index "management_response_submission_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."project_resource" add constraint "project_resource_pkey" PRIMARY KEY using index "project_resource_pkey";

alter table "public"."project_types" add constraint "project_types_pkey" PRIMARY KEY using index "project_types_pkey";

alter table "public"."resources" add constraint "resources_pkey" PRIMARY KEY using index "resources_pkey";

alter table "public"."management_response_submission" add constraint "public_management_response_submission_management_response_actio" FOREIGN KEY (management_response_action_id) REFERENCES management_response_actions(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."management_response_submission" validate constraint "public_management_response_submission_management_response_actio";

alter table "public"."profiles" add constraint "profiles_cuid_key" UNIQUE using index "profiles_cuid_key";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_uuid_key" UNIQUE using index "profiles_uuid_key";

alter table "public"."project_resource" add constraint "public_project_resource_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project_resource" validate constraint "public_project_resource_project_id_fkey";

alter table "public"."project_resource" add constraint "public_project_resource_resource_id_fkey" FOREIGN KEY (resource_id) REFERENCES resources(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."project_resource" validate constraint "public_project_resource_resource_id_fkey";

alter table "public"."projects" add constraint "public_projects_project_type_id_fkey" FOREIGN KEY (project_type_id) REFERENCES project_types(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."projects" validate constraint "public_projects_project_type_id_fkey";

grant delete on table "public"."management_response_submission" to "anon";

grant insert on table "public"."management_response_submission" to "anon";

grant references on table "public"."management_response_submission" to "anon";

grant select on table "public"."management_response_submission" to "anon";

grant trigger on table "public"."management_response_submission" to "anon";

grant truncate on table "public"."management_response_submission" to "anon";

grant update on table "public"."management_response_submission" to "anon";

grant delete on table "public"."management_response_submission" to "authenticated";

grant insert on table "public"."management_response_submission" to "authenticated";

grant references on table "public"."management_response_submission" to "authenticated";

grant select on table "public"."management_response_submission" to "authenticated";

grant trigger on table "public"."management_response_submission" to "authenticated";

grant truncate on table "public"."management_response_submission" to "authenticated";

grant update on table "public"."management_response_submission" to "authenticated";

grant delete on table "public"."management_response_submission" to "service_role";

grant insert on table "public"."management_response_submission" to "service_role";

grant references on table "public"."management_response_submission" to "service_role";

grant select on table "public"."management_response_submission" to "service_role";

grant trigger on table "public"."management_response_submission" to "service_role";

grant truncate on table "public"."management_response_submission" to "service_role";

grant update on table "public"."management_response_submission" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."project_resource" to "anon";

grant insert on table "public"."project_resource" to "anon";

grant references on table "public"."project_resource" to "anon";

grant select on table "public"."project_resource" to "anon";

grant trigger on table "public"."project_resource" to "anon";

grant truncate on table "public"."project_resource" to "anon";

grant update on table "public"."project_resource" to "anon";

grant delete on table "public"."project_resource" to "authenticated";

grant insert on table "public"."project_resource" to "authenticated";

grant references on table "public"."project_resource" to "authenticated";

grant select on table "public"."project_resource" to "authenticated";

grant trigger on table "public"."project_resource" to "authenticated";

grant truncate on table "public"."project_resource" to "authenticated";

grant update on table "public"."project_resource" to "authenticated";

grant delete on table "public"."project_resource" to "service_role";

grant insert on table "public"."project_resource" to "service_role";

grant references on table "public"."project_resource" to "service_role";

grant select on table "public"."project_resource" to "service_role";

grant trigger on table "public"."project_resource" to "service_role";

grant truncate on table "public"."project_resource" to "service_role";

grant update on table "public"."project_resource" to "service_role";

grant delete on table "public"."project_types" to "anon";

grant insert on table "public"."project_types" to "anon";

grant references on table "public"."project_types" to "anon";

grant select on table "public"."project_types" to "anon";

grant trigger on table "public"."project_types" to "anon";

grant truncate on table "public"."project_types" to "anon";

grant update on table "public"."project_types" to "anon";

grant delete on table "public"."project_types" to "authenticated";

grant insert on table "public"."project_types" to "authenticated";

grant references on table "public"."project_types" to "authenticated";

grant select on table "public"."project_types" to "authenticated";

grant trigger on table "public"."project_types" to "authenticated";

grant truncate on table "public"."project_types" to "authenticated";

grant update on table "public"."project_types" to "authenticated";

grant delete on table "public"."project_types" to "service_role";

grant insert on table "public"."project_types" to "service_role";

grant references on table "public"."project_types" to "service_role";

grant select on table "public"."project_types" to "service_role";

grant trigger on table "public"."project_types" to "service_role";

grant truncate on table "public"."project_types" to "service_role";

grant update on table "public"."project_types" to "service_role";

grant delete on table "public"."resources" to "anon";

grant insert on table "public"."resources" to "anon";

grant references on table "public"."resources" to "anon";

grant select on table "public"."resources" to "anon";

grant trigger on table "public"."resources" to "anon";

grant truncate on table "public"."resources" to "anon";

grant update on table "public"."resources" to "anon";

grant delete on table "public"."resources" to "authenticated";

grant insert on table "public"."resources" to "authenticated";

grant references on table "public"."resources" to "authenticated";

grant select on table "public"."resources" to "authenticated";

grant trigger on table "public"."resources" to "authenticated";

grant truncate on table "public"."resources" to "authenticated";

grant update on table "public"."resources" to "authenticated";

grant delete on table "public"."resources" to "service_role";

grant insert on table "public"."resources" to "service_role";

grant references on table "public"."resources" to "service_role";

grant select on table "public"."resources" to "service_role";

grant trigger on table "public"."resources" to "service_role";

grant truncate on table "public"."resources" to "service_role";

grant update on table "public"."resources" to "service_role";


