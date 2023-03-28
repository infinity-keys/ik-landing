-- AlterEnum
ALTER TYPE "StepType" ADD VALUE 'FUNCTION_CALL';

-- CreateTable
CREATE TABLE "StepFunctionCall" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "methodIds" TEXT[],
    "contractAddress" TEXT,
    "requireAllNfts" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StepFunctionCall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepFunctionCall_stepId_key" ON "StepFunctionCall"("stepId");

-- AddForeignKey
ALTER TABLE "StepFunctionCall" ADD CONSTRAINT "StepFunctionCall_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
