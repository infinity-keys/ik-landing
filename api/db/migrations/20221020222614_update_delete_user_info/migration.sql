/*
  Warnings:

  - Made the column `data` on table `Submission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "data" SET NOT NULL;
