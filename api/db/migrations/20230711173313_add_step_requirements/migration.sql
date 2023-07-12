-- CreateEnum
CREATE TYPE "StepRequirements" AS ENUM ('HOLDERS', 'ACCOUNT', 'WALLET', 'GAS', 'WALK', 'PATIENCE');

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "requirements" "StepRequirements"[];
