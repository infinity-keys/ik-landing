/*
  Warnings:

  - You are about to drop the `_BundleToPack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BundleToPack" DROP CONSTRAINT "_BundleToPack_A_fkey";

-- DropForeignKey
ALTER TABLE "_BundleToPack" DROP CONSTRAINT "_BundleToPack_B_fkey";

-- DropTable
DROP TABLE "_BundleToPack";

-- CreateTable
CREATE TABLE "PacksOnBundles" (
    "packId" TEXT NOT NULL,
    "bundleId" TEXT NOT NULL,
    "packSortWeight" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PacksOnBundles_pkey" PRIMARY KEY ("packId","bundleId")
);

-- AddForeignKey
ALTER TABLE "PacksOnBundles" ADD CONSTRAINT "PacksOnBundles_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PacksOnBundles" ADD CONSTRAINT "PacksOnBundles_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "Bundle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
