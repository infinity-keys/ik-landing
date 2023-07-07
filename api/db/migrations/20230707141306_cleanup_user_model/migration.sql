/*
  Warnings:

  - You are about to drop the column `banned` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `betaAccess` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `blocked` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discordProfile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `imageSrc` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mfa_enabled` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitterProfile` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "banned",
DROP COLUMN "betaAccess",
DROP COLUMN "blocked",
DROP COLUMN "country",
DROP COLUMN "discordProfile",
DROP COLUMN "imageSrc",
DROP COLUMN "mfa_enabled",
DROP COLUMN "twitterProfile",
ADD COLUMN     "avatar" TEXT;
