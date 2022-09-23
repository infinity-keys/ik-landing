alter table "public"."solves"
    add constraint "solves_pkey"
    primary key ("solved_puzzle_id", "solved_user_id");
