
alter table "public"."series" alter column "example" drop not null;
alter table "public"."series" add column "example" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."series" add column "example" text
--  null;
