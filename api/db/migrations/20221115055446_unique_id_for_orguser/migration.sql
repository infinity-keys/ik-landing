/*
  Warnings:

  - The primary key for the `RewardableConnection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instructions` on the `Step` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parentId,childId]` on the table `RewardableConnection` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `OrganizationUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `explanation` to the `Rewardable` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `RewardableConnection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "OrganizationUser" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rewardable" ADD COLUMN     "explanation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RewardableConnection" DROP CONSTRAINT "RewardableConnection_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RewardableConnection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "instructions";

-- CreateIndex
CREATE UNIQUE INDEX "RewardableConnection_parentId_childId_key" ON "RewardableConnection"("parentId", "childId");
