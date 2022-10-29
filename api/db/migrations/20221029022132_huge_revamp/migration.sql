/*
  Warnings:

  - The primary key for the `Bundle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `listPublicly` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Bundle` table. All the data in the column will be lost.
  - The primary key for the `Pack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `listPublicly` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pack` table. All the data in the column will be lost.
  - You are about to drop the `PacksOnBundles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PuzzlesOnPacks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BundleToNft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NftToPack` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Rewardable` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rewardableId` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardableId` to the `Pack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `Rewardable` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SiteRole" AS ENUM ('ADMIN', 'VERIFIED', 'ANONYMOUS');

-- CreateEnum
CREATE TYPE "OrgRole" AS ENUM ('MANAGER', 'MEMBER');

-- DropForeignKey
ALTER TABLE "PacksOnBundles" DROP CONSTRAINT "PacksOnBundles_bundleId_fkey";

-- DropForeignKey
ALTER TABLE "PacksOnBundles" DROP CONSTRAINT "PacksOnBundles_packId_fkey";

-- DropForeignKey
ALTER TABLE "PuzzlesOnPacks" DROP CONSTRAINT "PuzzlesOnPacks_packId_fkey";

-- DropForeignKey
ALTER TABLE "_BundleToNft" DROP CONSTRAINT "_BundleToNft_A_fkey";

-- DropForeignKey
ALTER TABLE "_BundleToNft" DROP CONSTRAINT "_BundleToNft_B_fkey";

-- DropForeignKey
ALTER TABLE "_NftToPack" DROP CONSTRAINT "_NftToPack_A_fkey";

-- DropForeignKey
ALTER TABLE "_NftToPack" DROP CONSTRAINT "_NftToPack_B_fkey";

-- DropIndex
DROP INDEX "Attempt_userId_idx";

-- DropIndex
DROP INDEX "RewardableConnection_parentId_childId_childSortWeight_key";

-- DropIndex
DROP INDEX "Submission_userId_idx";

-- AlterTable
ALTER TABLE "Bundle" DROP CONSTRAINT "Bundle_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "listPublicly",
DROP COLUMN "name",
DROP COLUMN "path",
DROP COLUMN "updatedAt",
ADD COLUMN     "rewardableId" TEXT NOT NULL,
ADD CONSTRAINT "Bundle_pkey" PRIMARY KEY ("rewardableId");

-- AlterTable
ALTER TABLE "Pack" DROP CONSTRAINT "Pack_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "listPublicly",
DROP COLUMN "name",
DROP COLUMN "path",
DROP COLUMN "updatedAt",
ADD COLUMN     "rewardableId" TEXT NOT NULL,
ADD CONSTRAINT "Pack_pkey" PRIMARY KEY ("rewardableId");

-- AlterTable
ALTER TABLE "Rewardable" ADD COLUMN     "orgId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RewardableConnection" ALTER COLUMN "childSortWeight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Step" ALTER COLUMN "stepSortWeight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "siteRole" "SiteRole" NOT NULL DEFAULT 'ANONYMOUS';

-- DropTable
DROP TABLE "PacksOnBundles";

-- DropTable
DROP TABLE "PuzzlesOnPacks";

-- DropTable
DROP TABLE "_BundleToNft";

-- DropTable
DROP TABLE "_NftToPack";

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationUser" (
    "orgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userOrgRole" "OrgRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUser_orgId_userId_key" ON "OrganizationUser"("orgId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Rewardable_slug_key" ON "Rewardable"("slug");

-- CreateIndex
CREATE INDEX "RewardableConnection_parentId_childId_childSortWeight_idx" ON "RewardableConnection"("parentId", "childId", "childSortWeight" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User_publicAddress_key" ON "User"("publicAddress");

-- AddForeignKey
ALTER TABLE "Rewardable" ADD CONSTRAINT "Rewardable_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pack" ADD CONSTRAINT "Pack_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
