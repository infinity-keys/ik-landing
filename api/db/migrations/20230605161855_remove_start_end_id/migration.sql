/*
  Warnings:

  - You are about to drop the column `endId` on the `StepTokenIdRange` table. All the data in the column will be lost.
  - You are about to drop the column `startId` on the `StepTokenIdRange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StepTokenIdRange" DROP COLUMN "endId",
DROP COLUMN "startId";
