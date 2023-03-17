/*
  Warnings:

  - A unique constraint covering the columns `[migrateLandingRoute]` on the table `Step` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Step_migrateLandingRoute_key" ON "Step"("migrateLandingRoute");
