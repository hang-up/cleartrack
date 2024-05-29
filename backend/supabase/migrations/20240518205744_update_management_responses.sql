create type "public"."Recommendation_Level" as enum ('Level 1 -  No Progress or insignificant Progress', 'Level 2 - Planning stage', 'Level 3 - Preparations for implementation', 'Level 4 - Substantial implementation', 'Level 5 - Full implementation');

alter table "public"."management_response_actions" drop column "deliverables";

alter table "public"."management_response_actions" drop column "expected_completion_date";

alter table "public"."management_response_actions" add column "Comments" text;

alter table "public"."management_response_actions" add column "Date_Recommendation_Closed" date;

alter table "public"."management_response_actions" add column "How_Late" timestamp with time zone;

alter table "public"."management_response_actions" add column "Latest_approved_completion_date" timestamp with time zone;

alter table "public"."management_response_actions" add column "Link_to_MRAP" character varying;

alter table "public"."management_response_actions" add column "Recommendation_EN" text;

alter table "public"."management_response_actions" add column "Recommendation_FR" text;

alter table "public"."management_response_actions" add column "Recommendation_Level" "Recommendation_Level";

alter table "public"."management_response_actions" alter column "status" set data type recommendation_status using "status"::recommendation_status;

alter table "public"."management_response_submission" add column "Audit_Eval_ Response" text;


