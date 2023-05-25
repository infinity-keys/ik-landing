-- CreateEnum
CREATE TYPE "OriumCheckType" AS ENUM ('HAS_CREATED_VAULT', 'HAS_DEPOSITED_NFT', 'HAS_CREATED_SCHOLARSHIP');

-- CreateTable
CREATE TABLE "StepOriumApi" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "checkType" "OriumCheckType" NOT NULL,

    CONSTRAINT "StepOriumApi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepOriumApi_stepId_key" ON "StepOriumApi"("stepId");

-- AddForeignKey
ALTER TABLE "StepOriumApi" ADD CONSTRAINT "StepOriumApi_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
