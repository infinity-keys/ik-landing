-- AlterEnum
ALTER TYPE "StepType" ADD VALUE 'COMETH_API';

-- CreateTable
CREATE TABLE "StepComethApi" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,

    CONSTRAINT "StepComethApi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepComethApi_stepId_key" ON "StepComethApi"("stepId");

-- AddForeignKey
ALTER TABLE "StepComethApi" ADD CONSTRAINT "StepComethApi_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
