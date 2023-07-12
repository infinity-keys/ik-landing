-- CreateEnum
CREATE TYPE "StepCategory" AS ENUM ('SEEK', 'INFER', 'REWIND', 'TRACK', 'COLLECT', 'ACTIVATE');

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "body" TEXT[],
ADD COLUMN     "category" "StepCategory" NOT NULL DEFAULT 'SEEK',
ADD COLUMN     "hint" TEXT NOT NULL DEFAULT 'one';
