/*
  Warnings:

  - You are about to drop the column `siteRole` on the `User` table. All the data in the column will be lost.
  - The `roles` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "siteRole",
DROP COLUMN "roles",
ADD COLUMN     "roles" "SiteRole"[] DEFAULT ARRAY['ANONYMOUS']::"SiteRole"[];
