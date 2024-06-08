alter table "public"."project_types" disable row level security;

create policy "Enable read access for all users"
on "public"."management_response_actions"
as permissive
for select
to public
using (true);


create policy "Enable select for authenticated users only"
on "public"."project_types"
as permissive
for select
to authenticated
using (true);


create policy "Enable read access for all users"
on "public"."resources"
as permissive
for select
to public
using (true);



