/*
  Warnings:

  - The primary key for the `Bundle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[rewardableId]` on the table `Bundle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rewardableId]` on the table `Pack` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Bundle` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Pack` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_puzzleId_fkey";

-- AlterTable
ALTER TABLE "Bundle" DROP CONSTRAINT "Bundle_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Bundle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Pack" DROP CONSTRAINT "Pack_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Pack_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bundle_rewardableId_key" ON "Bundle"("rewardableId");

-- CreateIndex
CREATE UNIQUE INDEX "Pack_rewardableId_key" ON "Pack"("rewardableId");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("rewardableId") ON DELETE RESTRICT ON UPDATE CASCADE;
