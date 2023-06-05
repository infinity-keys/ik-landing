-- AlterEnum
ALTER TYPE "StepType" ADD VALUE 'ASSET_TRANSFER';

-- CreateTable
CREATE TABLE "StepAssetTransfer" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "excludeZeroValue" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StepAssetTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepAssetTransfer_stepId_key" ON "StepAssetTransfer"("stepId");

-- AddForeignKey
ALTER TABLE "StepAssetTransfer" ADD CONSTRAINT "StepAssetTransfer_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
