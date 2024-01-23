/*
  Warnings:

  - A unique constraint covering the columns `[lookupId]` on the table `Nft` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "lookupId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Nft_lookupId_key" ON "Nft"("lookupId");
