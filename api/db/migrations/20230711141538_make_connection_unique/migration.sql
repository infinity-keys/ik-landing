/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `LensKeypConnection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LensKeypConnection_id_userId_key" ON "LensKeypConnection"("id", "userId");
