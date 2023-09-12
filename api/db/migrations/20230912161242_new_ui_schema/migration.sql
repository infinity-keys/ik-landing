/*
  Warnings:

  - You are about to drop the column `isAnon` on the `Puzzle` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PuzzleRequirements" AS ENUM ('HOLDERS_ONLY', 'SOCIAL_ACCOUNT', 'WALLET_GAS', 'TRAVEL', 'PATIENCE', 'WORDPLAY');

-- CreateEnum
CREATE TYPE "StepGuideType" AS ENUM ('SEEK', 'INFER', 'REWIND', 'TRACK', 'COLLECT', 'ACTIVATE');

-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "isAnon",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "requirements" "PuzzleRequirements"[];

-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "defaultImage" TEXT,
ADD COLUMN     "solutionHint" TEXT,
ADD COLUMN     "solutionImage" TEXT,
ADD COLUMN     "stepGuideType" "StepGuideType";

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
