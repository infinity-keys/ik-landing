/*
  Warnings:

  - You are about to drop the column `category` on the `Step` table. All the data in the column will be lost.
  - Added the required column `stepGuideType` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Step" DROP COLUMN "category",
ADD COLUMN     "stepGuideType" "StepGuideType" NOT NULL;
