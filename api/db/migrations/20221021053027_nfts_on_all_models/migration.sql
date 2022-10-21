/*
  Warnings:

  - You are about to drop the column `puzzleId` on the `Nft` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_puzzleId_fkey";

-- DropIndex
DROP INDEX "Nft_puzzleId_key";

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "puzzleId";

-- CreateTable
CREATE TABLE "_BundleToNft" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NftToPuzzle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NftToPack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BundleToNft_AB_unique" ON "_BundleToNft"("A", "B");

-- CreateIndex
CREATE INDEX "_BundleToNft_B_index" ON "_BundleToNft"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NftToPuzzle_AB_unique" ON "_NftToPuzzle"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToPuzzle_B_index" ON "_NftToPuzzle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NftToPack_AB_unique" ON "_NftToPack"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToPack_B_index" ON "_NftToPack"("B");

-- AddForeignKey
ALTER TABLE "_BundleToNft" ADD CONSTRAINT "_BundleToNft_A_fkey" FOREIGN KEY ("A") REFERENCES "Bundle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BundleToNft" ADD CONSTRAINT "_BundleToNft_B_fkey" FOREIGN KEY ("B") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToPuzzle" ADD CONSTRAINT "_NftToPuzzle_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToPuzzle" ADD CONSTRAINT "_NftToPuzzle_B_fkey" FOREIGN KEY ("B") REFERENCES "Puzzle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToPack" ADD CONSTRAINT "_NftToPack_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToPack" ADD CONSTRAINT "_NftToPack_B_fkey" FOREIGN KEY ("B") REFERENCES "Pack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
