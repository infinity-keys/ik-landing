-- AlterEnum
ALTER TYPE "StepType" ADD VALUE 'NFT_CHECK';

-- CreateTable
CREATE TABLE "StepNftCheck" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "chainId" INTEGER NOT NULL,

    CONSTRAINT "StepNftCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepNftCheck_stepId_key" ON "StepNftCheck"("stepId");

-- AddForeignKey
ALTER TABLE "StepNftCheck" ADD CONSTRAINT "StepNftCheck_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
