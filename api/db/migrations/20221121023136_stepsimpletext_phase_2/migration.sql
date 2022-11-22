/*
  Warnings:

  - The primary key for the `StepSimpleText` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[stepId]` on the table `StepSimpleText` will be added. If there are existing duplicate values, this will fail.
  - Made the column `id` on table `StepSimpleText` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "StepSimpleText" DROP CONSTRAINT "StepSimpleText_pkey",
ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "StepSimpleText_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "StepSimpleText_stepId_key" ON "StepSimpleText"("stepId");
