/*
  Warnings:

  - A unique constraint covering the columns `[slug,type]` on the table `Rewardable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Rewardable_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Rewardable_slug_type_key" ON "Rewardable"("slug", "type");
