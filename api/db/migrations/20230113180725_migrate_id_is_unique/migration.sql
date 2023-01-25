/*
  Warnings:

  - A unique constraint covering the columns `[migrateId]` on the table `Rewardable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rewardable_migrateId_key" ON "Rewardable"("migrateId");
