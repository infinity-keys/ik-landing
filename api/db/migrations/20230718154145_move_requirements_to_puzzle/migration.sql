/*
  Warnings:

  - You are about to drop the column `requirements` on the `Step` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PuzzleRequirements" AS ENUM ('HOLDERS', 'ACCOUNT', 'WALLET', 'GAS', 'WALK', 'PATIENCE');

-- AlterTable
ALTER TABLE "Puzzle" ADD COLUMN     "requirements" "PuzzleRequirements"[];

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "requirements";

-- DropEnum
DROP TYPE "StepRequirements";
