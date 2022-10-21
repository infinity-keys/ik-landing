/*
  Warnings:

  - The required column `id` was added to the `PacksOnBundles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `PuzzlesOnPacks` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `StepsOnPuzzles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "PacksOnBundles" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PuzzlesOnPacks" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StepsOnPuzzles" ADD COLUMN     "id" TEXT NOT NULL;
