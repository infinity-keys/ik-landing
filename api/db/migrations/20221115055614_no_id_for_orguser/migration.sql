/*
  Warnings:

  - The primary key for the `OrganizationUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrganizationUser` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OrganizationUser_orgId_userId_key";

-- AlterTable
ALTER TABLE "OrganizationUser" DROP CONSTRAINT "OrganizationUser_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("orgId", "userId");
