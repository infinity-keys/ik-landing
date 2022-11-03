alter table "public"."event_displays"
  add constraint "event_displays_pack_id_fkey"
  foreign key ("pack_id")
  references "public"."packs"
  ("pack_id") on update restrict on delete restrict;
