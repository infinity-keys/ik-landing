-- DropForeignKey
ALTER TABLE "NftCheckDatum" DROP CONSTRAINT "NftCheckDatum_stepNftCheckId_fkey";

-- DropForeignKey
ALTER TABLE "StepAssetTransfer" DROP CONSTRAINT "StepAssetTransfer_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepComethApi" DROP CONSTRAINT "StepComethApi_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepErc20Balance" DROP CONSTRAINT "StepErc20Balance_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepFunctionCall" DROP CONSTRAINT "StepFunctionCall_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepLensApi" DROP CONSTRAINT "StepLensApi_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepNftCheck" DROP CONSTRAINT "StepNftCheck_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepOriumApi" DROP CONSTRAINT "StepOriumApi_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepTokenIdRange" DROP CONSTRAINT "StepTokenIdRange_stepId_fkey";

-- AddForeignKey
ALTER TABLE "StepFunctionCall" ADD CONSTRAINT "StepFunctionCall_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftCheckDatum" ADD CONSTRAINT "NftCheckDatum_stepNftCheckId_fkey" FOREIGN KEY ("stepNftCheckId") REFERENCES "StepNftCheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepNftCheck" ADD CONSTRAINT "StepNftCheck_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepComethApi" ADD CONSTRAINT "StepComethApi_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepErc20Balance" ADD CONSTRAINT "StepErc20Balance_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepOriumApi" ADD CONSTRAINT "StepOriumApi_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepTokenIdRange" ADD CONSTRAINT "StepTokenIdRange_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepLensApi" ADD CONSTRAINT "StepLensApi_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepAssetTransfer" ADD CONSTRAINT "StepAssetTransfer_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
