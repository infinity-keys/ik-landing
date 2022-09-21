CREATE  INDEX "solves_pkey" on
  "public"."solves" using btree ("solved_puzzle_id", "solved_user_id");
