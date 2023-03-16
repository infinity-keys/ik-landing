/*
  Warnings:

  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "siteRole" "SiteRole" NOT NULL DEFAULT 'ANONYMOUS',
DROP COLUMN "roles",
ADD COLUMN     "roles" TEXT NOT NULL DEFAULT 'ANONYMOUS';
