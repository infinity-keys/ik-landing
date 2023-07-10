-- CreateEnum
CREATE TYPE "RewardableSortType" AS ENUM ('FEATURED');

-- AlterTable
ALTER TABLE "Rewardable" ADD COLUMN     "sortType" "RewardableSortType";
