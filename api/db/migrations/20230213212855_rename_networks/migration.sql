/*
  Warnings:

  - You are about to drop the column `availableNetworks` on the `Rewardable` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AvailableChains" AS ENUM ('AVAX', 'ETH', 'POLY', 'OPT');

-- AlterTable
ALTER TABLE "Rewardable" DROP COLUMN "availableNetworks",
ADD COLUMN     "availableChains" "AvailableChains"[] DEFAULT ARRAY['AVAX', 'ETH', 'POLY', 'OPT']::"AvailableChains"[];

-- DropEnum
DROP TYPE "AvailableNetworks";
