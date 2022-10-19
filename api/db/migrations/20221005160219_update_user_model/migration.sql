/*
  Warnings:

  - Made the column `nonce` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "publicAddress" DROP NOT NULL,
ALTER COLUMN "nonce" SET NOT NULL;
