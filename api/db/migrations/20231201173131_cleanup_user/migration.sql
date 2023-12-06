/*
  Warnings:

  - You are about to drop the column `accessToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nonce` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `OAuth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OAuthConnection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OAuth" DROP CONSTRAINT "OAuth_userId_fkey";

-- DropForeignKey
ALTER TABLE "OAuthConnection" DROP CONSTRAINT "OAuthConnection_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "accessToken",
DROP COLUMN "avatar",
DROP COLUMN "nonce",
DROP COLUMN "refreshToken",
DROP COLUMN "username";

-- DropTable
DROP TABLE "OAuth";

-- DropTable
DROP TABLE "OAuthConnection";
