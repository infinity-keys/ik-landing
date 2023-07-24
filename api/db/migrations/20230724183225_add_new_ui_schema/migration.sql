/*
  Warnings:

  - Added the required column `coverImage` to the `Puzzle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defaultImage` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solutionHint` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepGuideType` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PuzzleRequirements" AS ENUM ('HOLDERS', 'ACCOUNT', 'WALLET', 'GAS', 'WALK', 'PATIENCE');

-- CreateEnum
CREATE TYPE "StepGuideType" AS ENUM ('SEEK', 'INFER', 'REWIND', 'TRACK', 'COLLECT', 'ACTIVATE');

-- AlterTable
ALTER TABLE "Puzzle" ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "requirements" "PuzzleRequirements"[];

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "defaultImage" TEXT NOT NULL,
ADD COLUMN     "solutionHint" TEXT NOT NULL,
ADD COLUMN     "solutionImage" TEXT,
ADD COLUMN     "stepGuideType" "StepGuideType" NOT NULL;

-- CreateTable
CREATE TABLE "StepPage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stepId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT,
    "showStepGuideHint" BOOLEAN NOT NULL DEFAULT false,
    "sortWeight" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "StepPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepPage_stepId_sortWeight_key" ON "StepPage"("stepId", "sortWeight" ASC);

-- AddForeignKey
ALTER TABLE "StepPage" ADD CONSTRAINT "StepPage_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
