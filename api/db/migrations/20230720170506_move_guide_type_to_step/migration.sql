/*
  Warnings:

  - You are about to drop the column `category` on the `StepPage` table. All the data in the column will be lost.
  - Added the required column `category` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "category" "StepGuideType" NOT NULL;

-- AlterTable
ALTER TABLE "StepPage" DROP COLUMN "category";
