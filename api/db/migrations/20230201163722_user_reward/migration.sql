/*
  Warnings:

  - You are about to drop the column `claimed` on the `Rewardable` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `Rewardable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rewardable" DROP COLUMN "claimed",
DROP COLUMN "completed";

-- CreateTable
CREATE TABLE "UserReward" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "rewardableId" TEXT NOT NULL,

    CONSTRAINT "UserReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NftToUserReward" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserReward_userId_rewardableId_key" ON "UserReward"("userId", "rewardableId");

-- CreateIndex
CREATE UNIQUE INDEX "_NftToUserReward_AB_unique" ON "_NftToUserReward"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToUserReward_B_index" ON "_NftToUserReward"("B");

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToUserReward" ADD CONSTRAINT "_NftToUserReward_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToUserReward" ADD CONSTRAINT "_NftToUserReward_B_fkey" FOREIGN KEY ("B") REFERENCES "UserReward"("id") ON DELETE CASCADE ON UPDATE CASCADE;
