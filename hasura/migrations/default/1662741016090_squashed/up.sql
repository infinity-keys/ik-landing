
SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE FUNCTION public.set_current_timestamp_date_updated() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."date_updated" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.puzzles (
    puzzle_id uuid DEFAULT gen_random_uuid() NOT NULL,
    solution text NOT NULL,
    landing_route text NOT NULL,
    success_route text NOT NULL,
    fail_route text DEFAULT '/'::text NOT NULL,
    simple_name text NOT NULL,
    input_type text DEFAULT 'boxes'::text,
    fail_message text,
    success_message text,
    landing_message text,
    list_pubicly boolean DEFAULT false NOT NULL,
    final_step boolean DEFAULT true,
    sort_weight integer DEFAULT 0 NOT NULL
);
CREATE FUNCTION public.solution_char_count(puzzle_row public.puzzles) RETURNS integer
    LANGUAGE sql STABLE
    AS $$
  SELECT char_length(puzzle_row.solution)
$$;
CREATE TABLE public.chains (
    chain_name text NOT NULL,
    chain_id integer NOT NULL
);
CREATE TABLE public.nft_metadata (
    token_id integer NOT NULL,
    contract_name text NOT NULL,
    data jsonb NOT NULL,
    cloudinary_id text
);
CREATE TABLE public.nfts (
    "puzzleId" uuid NOT NULL,
    "tokenId" integer NOT NULL,
    contract_name text DEFAULT 'achievement'::text
);
COMMENT ON TABLE public.nfts IS 'Info about our nfts';
CREATE TABLE public.pack_puzzles (
    pack_id uuid NOT NULL,
    puzzle_id uuid NOT NULL
);
COMMENT ON TABLE public.pack_puzzles IS 'group puzzles together';
CREATE TABLE public.packs (
    pack_id uuid DEFAULT gen_random_uuid() NOT NULL,
    pack_name text NOT NULL,
    simple_name text NOT NULL,
    "nftId" numeric
);
CREATE TABLE public.puzzle_input_type (
    type text NOT NULL
);
COMMENT ON TABLE public.puzzle_input_type IS 'The types of puzzles';
CREATE TABLE public.puzzle_nft_requirement (
    puzzle_id uuid NOT NULL,
    nft_token_id integer NOT NULL,
    nft_contract_address text NOT NULL
);
COMMENT ON TABLE public.puzzle_nft_requirement IS 'NFT id and address required to vie a puzzle';
CREATE TABLE public.puzzles_series (
    puzzle_id uuid NOT NULL,
    step integer DEFAULT 1 NOT NULL,
    series_id uuid NOT NULL
);
COMMENT ON TABLE public.puzzles_series IS 'Multi-step puzzles';
CREATE TABLE public.series (
    series_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    base_path text
);
CREATE TABLE public.series_nfts (
    series_id uuid NOT NULL,
    nft_token_id integer NOT NULL,
    nft_contract_name text NOT NULL
);
COMMENT ON TABLE public.series_nfts IS 'Associate NFTs with series';
CREATE TABLE public.submissions (
    puzzle_id uuid NOT NULL,
    form_data jsonb NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.users (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text,
    name text,
    date_created timestamp with time zone DEFAULT now(),
    auth_id text,
    public_address text,
    date_updated timestamp with time zone DEFAULT now(),
    nonce text
);
ALTER TABLE ONLY public.chains
    ADD CONSTRAINT chains_pkey PRIMARY KEY (chain_id);
ALTER TABLE ONLY public.nft_metadata
    ADD CONSTRAINT nft_metadata_pkey PRIMARY KEY (token_id, contract_name);
ALTER TABLE ONLY public.nft_metadata
    ADD CONSTRAINT nft_metadata_token_id_contract_name_key UNIQUE (token_id, contract_name);
ALTER TABLE ONLY public.nfts
    ADD CONSTRAINT nfts_pkey PRIMARY KEY ("puzzleId", "tokenId");
ALTER TABLE ONLY public.nfts
    ADD CONSTRAINT "nfts_puzzleId_key" UNIQUE ("puzzleId");
ALTER TABLE ONLY public.pack_puzzles
    ADD CONSTRAINT pack_puzzles_pkey PRIMARY KEY (pack_id, puzzle_id);
ALTER TABLE ONLY public.packs
    ADD CONSTRAINT packs_pkey1 PRIMARY KEY (pack_id);
ALTER TABLE ONLY public.packs
    ADD CONSTRAINT packs_simple_name_key UNIQUE (simple_name);
ALTER TABLE ONLY public.puzzle_input_type
    ADD CONSTRAINT puzzle_input_type_pkey PRIMARY KEY (type);
ALTER TABLE ONLY public.puzzle_nft_requirement
    ADD CONSTRAINT puzzle_nft_requirement_pkey PRIMARY KEY (puzzle_id, nft_token_id, nft_contract_address);
ALTER TABLE ONLY public.puzzles
    ADD CONSTRAINT puzzles_landing_route_key UNIQUE (landing_route);
ALTER TABLE ONLY public.puzzles
    ADD CONSTRAINT puzzles_pkey PRIMARY KEY (puzzle_id);
ALTER TABLE ONLY public.puzzles
    ADD CONSTRAINT puzzles_puzzle_id_key UNIQUE (puzzle_id);
ALTER TABLE ONLY public.puzzles_series
    ADD CONSTRAINT puzzles_series_series_id_puzzle_id_key UNIQUE (series_id, puzzle_id);
ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_base_path_key UNIQUE (base_path);
ALTER TABLE ONLY public.series_nfts
    ADD CONSTRAINT series_nfts_pkey PRIMARY KEY (series_id, nft_token_id, nft_contract_name);
ALTER TABLE ONLY public.series_nfts
    ADD CONSTRAINT series_nfts_series_id_nft_token_id_nft_contract_name_key UNIQUE (series_id, nft_token_id, nft_contract_name);
ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_pkey PRIMARY KEY (series_id);
ALTER TABLE ONLY public.series
    ADD CONSTRAINT series_series_id_key UNIQUE (series_id);
ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_pkey PRIMARY KEY (puzzle_id, user_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_auth_id_key UNIQUE (auth_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_public_address_key UNIQUE (public_address);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_id_key UNIQUE (user_id);
CREATE TRIGGER set_public_users_date_updated BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_date_updated();
COMMENT ON TRIGGER set_public_users_date_updated ON public.users IS 'trigger to set value of column "date_updated" to current timestamp on row update';
ALTER TABLE ONLY public.nfts
    ADD CONSTRAINT "nfts_contract_name_tokenId_fkey" FOREIGN KEY (contract_name, "tokenId") REFERENCES public.nft_metadata(contract_name, token_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.nfts
    ADD CONSTRAINT "nfts_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES public.puzzles(puzzle_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.pack_puzzles
    ADD CONSTRAINT pack_puzzles_pack_id_fkey FOREIGN KEY (pack_id) REFERENCES public.packs(pack_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.pack_puzzles
    ADD CONSTRAINT packs_puzzle_id_fkey FOREIGN KEY (puzzle_id) REFERENCES public.puzzles(puzzle_id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.puzzles
    ADD CONSTRAINT puzzles_input_type_fkey FOREIGN KEY (input_type) REFERENCES public.puzzle_input_type(type) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.puzzles_series
    ADD CONSTRAINT puzzles_series_puzzle_id_fkey FOREIGN KEY (puzzle_id) REFERENCES public.puzzles(puzzle_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.puzzles_series
    ADD CONSTRAINT puzzles_series_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(series_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.series_nfts
    ADD CONSTRAINT series_nfts_nft_token_id_nft_contract_name_fkey FOREIGN KEY (nft_token_id, nft_contract_name) REFERENCES public.nft_metadata(token_id, contract_name) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.series_nfts
    ADD CONSTRAINT series_nfts_series_id_fkey FOREIGN KEY (series_id) REFERENCES public.series(series_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_puzzle_id_fkey FOREIGN KEY (puzzle_id) REFERENCES public.puzzles(puzzle_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.submissions
    ADD CONSTRAINT submissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;

alter table "public"."series" add column "example" text
 null;

alter table "public"."series" drop column "example" cascade;
