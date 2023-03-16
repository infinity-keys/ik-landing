/*
  Warnings:

  - You are about to drop the column `publicAddress` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_publicAddress_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "publicAddress";
