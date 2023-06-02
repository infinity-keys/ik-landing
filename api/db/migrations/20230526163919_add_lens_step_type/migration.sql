-- CreateEnum
CREATE TYPE "LensCheckType" AS ENUM ('HAS_COMPLETED_PROFILE', 'HAS_GENESIS_POST', 'HAS_COLLECTED_POST', 'IS_FOLLOWING_USER');

-- AlterEnum
ALTER TYPE "StepType" ADD VALUE 'LENS_API';

-- CreateTable
CREATE TABLE "StepLensApi" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "checkType" "LensCheckType" NOT NULL,

    CONSTRAINT "StepLensApi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StepLensApi_stepId_key" ON "StepLensApi"("stepId");

-- AddForeignKey
ALTER TABLE "StepLensApi" ADD CONSTRAINT "StepLensApi_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
