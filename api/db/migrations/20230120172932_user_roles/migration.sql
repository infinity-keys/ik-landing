/*
  Warnings:

  - You are about to drop the column `siteRole` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "siteRole",
ADD COLUMN     "roles" "SiteRole" NOT NULL DEFAULT 'ANONYMOUS';
