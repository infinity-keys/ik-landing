/*
  Warnings:

  - Added the required column `username` to the `DiscordConnection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordConnection" ADD COLUMN     "username" TEXT NOT NULL;
