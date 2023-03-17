/*
  Warnings:

  - A unique constraint covering the columns `[parentId,childId,childSortWeight]` on the table `RewardableConnection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RewardableConnection_parentId_childId_childSortWeight_key" ON "RewardableConnection"("parentId", "childId", "childSortWeight" ASC);
