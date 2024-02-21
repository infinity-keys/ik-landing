-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_stepId_fkey";

-- DropForeignKey
ALTER TABLE "Solve" DROP CONSTRAINT "Solve_attemptId_fkey";

-- DropForeignKey
ALTER TABLE "StepPage" DROP CONSTRAINT "StepPage_stepId_fkey";

-- DropForeignKey
ALTER TABLE "StepSimpleText" DROP CONSTRAINT "StepSimpleText_stepId_fkey";

-- AddForeignKey
ALTER TABLE "StepPage" ADD CONSTRAINT "StepPage_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepSimpleText" ADD CONSTRAINT "StepSimpleText_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solve" ADD CONSTRAINT "Solve_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
