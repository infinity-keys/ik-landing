-- CreateEnum
CREATE TYPE "RewardableType" AS ENUM ('PUZZLE', 'PACK', 'BUNDLE');

-- CreateTable
CREATE TABLE "Rewardable" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "successMessage" TEXT,
    "listPublicly" BOOLEAN NOT NULL DEFAULT true,
    "type" "RewardableType" NOT NULL,

    CONSTRAINT "Rewardable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NftToRewardable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NftToRewardable_AB_unique" ON "_NftToRewardable"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToRewardable_B_index" ON "_NftToRewardable"("B");

-- AddForeignKey
ALTER TABLE "_NftToRewardable" ADD CONSTRAINT "_NftToRewardable_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToRewardable" ADD CONSTRAINT "_NftToRewardable_B_fkey" FOREIGN KEY ("B") REFERENCES "Rewardable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
