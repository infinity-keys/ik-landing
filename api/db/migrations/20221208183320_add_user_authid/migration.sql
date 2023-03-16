/*
  Warnings:

  - A unique constraint covering the columns `[authId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");
