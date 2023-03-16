/*
  Warnings:

  - You are about to drop the column `guess` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `solution` on the `Step` table. All the data in the column will be lost.
  - Added the required column `data` to the `Attempt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('SIMPLE_TEXT');

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "guess",
ADD COLUMN     "data" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "solution",
ADD COLUMN     "type" "StepType" NOT NULL DEFAULT 'SIMPLE_TEXT';

-- CreateTable
CREATE TABLE "StepSimpleText" (
    "stepId" TEXT NOT NULL,
    "solution" TEXT NOT NULL,

    CONSTRAINT "StepSimpleText_pkey" PRIMARY KEY ("stepId")
);

-- AddForeignKey
ALTER TABLE "StepSimpleText" ADD CONSTRAINT "StepSimpleText_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
