/*
  Warnings:

  - Added the required column `featuredImage` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "featuredImage" TEXT NOT NULL,
ALTER COLUMN "category" DROP DEFAULT,
ALTER COLUMN "hint" DROP DEFAULT;
