/*
  Warnings:

  - The `followedUserId` column on the `StepLensApi` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StepLensApi" DROP COLUMN "followedUserId",
ADD COLUMN     "followedUserId" TEXT[];
