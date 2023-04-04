-- CreateTable
CREATE TABLE "StepTokenIdRange" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "startId" INTEGER NOT NULL,
    "endId" INTEGER NOT NULL,

    CONSTRAINT "StepTokenIdRange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepTokenIdRange_stepId_key" ON "StepTokenIdRange"("stepId");

-- AddForeignKey
ALTER TABLE "StepTokenIdRange" ADD CONSTRAINT "StepTokenIdRange_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
