-- AlterEnum
ALTER TYPE "StepType" ADD VALUE 'ERC20_BALANCEp';

-- CreateTable
CREATE TABLE "StepErc20Balance" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "minBalance" TEXT NOT NULL,

    CONSTRAINT "StepErc20Balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepErc20Balance_stepId_key" ON "StepErc20Balance"("stepId");

-- AddForeignKey
ALTER TABLE "StepErc20Balance" ADD CONSTRAINT "StepErc20Balance_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
