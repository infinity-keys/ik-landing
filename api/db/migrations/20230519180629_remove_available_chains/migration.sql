/*
  Warnings:

  - You are about to drop the column `availableChains` on the `Rewardable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rewardable" DROP COLUMN "availableChains";

-- DropEnum
DROP TYPE "AvailableChains";
