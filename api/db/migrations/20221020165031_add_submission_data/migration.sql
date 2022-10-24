/*
  Warnings:

  - You are about to drop the column `address` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "address",
DROP COLUMN "email",
ADD COLUMN     "data" JSONB;
