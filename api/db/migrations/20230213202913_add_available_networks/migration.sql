-- CreateEnum
CREATE TYPE "AvailableNetworks" AS ENUM ('AVAX', 'ETH', 'POLY', 'OPT');

-- AlterTable
ALTER TABLE "Rewardable" ADD COLUMN     "availableNetworks" "AvailableNetworks"[] DEFAULT ARRAY['AVAX', 'ETH', 'POLY', 'OPT']::"AvailableNetworks"[];
