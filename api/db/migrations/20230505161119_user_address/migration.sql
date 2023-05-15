/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
