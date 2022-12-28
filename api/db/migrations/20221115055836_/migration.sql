/*
  Warnings:

  - The primary key for the `OrganizationUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[orgId,userId]` on the table `OrganizationUser` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `OrganizationUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUser_orgId_userId_key" ON "OrganizationUser"("orgId", "userId");
