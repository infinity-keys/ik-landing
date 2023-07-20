/*
  Warnings:

  - You are about to drop the column `body` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Step` table. All the data in the column will be lost.
  - You are about to drop the column `hint` on the `Step` table. All the data in the column will be lost.
  - Made the column `coverImage` on table `Puzzle` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `defaultImage` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solutionHint` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StepGuideType" AS ENUM ('SEEK', 'INFER', 'REWIND', 'TRACK', 'COLLECT', 'ACTIVATE');

-- AlterTable
ALTER TABLE "Puzzle" ALTER COLUMN "coverImage" SET NOT NULL;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "body",
DROP COLUMN "category",
DROP COLUMN "hint",
ADD COLUMN     "defaultImage" TEXT NOT NULL,
ADD COLUMN     "solutionHint" TEXT NOT NULL;

-- DropEnum
DROP TYPE "StepCategory";

-- CreateTable
CREATE TABLE "StepPage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stepId" TEXT NOT NULL,
    "category" "StepGuideType" NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT,
    "showStepGuideHint" BOOLEAN NOT NULL DEFAULT false,
    "sortWeight" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "StepPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepPage_stepId_key" ON "StepPage"("stepId");

-- CreateIndex
CREATE UNIQUE INDEX "StepPage_stepId_sortWeight_key" ON "StepPage"("stepId", "sortWeight" ASC);

-- AddForeignKey
ALTER TABLE "StepPage" ADD CONSTRAINT "StepPage_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
