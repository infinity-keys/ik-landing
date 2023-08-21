/*
  Warnings:

  - The values [HOLDERS,ACCOUNT,WALLET,GAS,WALK] on the enum `PuzzleRequirements` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PuzzleRequirements_new" AS ENUM ('HOLDERS_ONLY', 'SOCIAL_ACCOUNT', 'WALLET_GAS', 'TRAVEL', 'PATIENCE', 'WORDPLAY');
ALTER TABLE "Puzzle" ALTER COLUMN "requirements" TYPE "PuzzleRequirements_new"[] USING ("requirements"::text::"PuzzleRequirements_new"[]);
ALTER TYPE "PuzzleRequirements" RENAME TO "PuzzleRequirements_old";
ALTER TYPE "PuzzleRequirements_new" RENAME TO "PuzzleRequirements";
DROP TYPE "PuzzleRequirements_old";
COMMIT;
