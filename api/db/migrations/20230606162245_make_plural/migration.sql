/*
  Warnings:

  - You are about to drop the column `followedUserId` on the `StepLensApi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StepLensApi" DROP COLUMN "followedUserId",
ADD COLUMN     "followedUserIds" TEXT[];
