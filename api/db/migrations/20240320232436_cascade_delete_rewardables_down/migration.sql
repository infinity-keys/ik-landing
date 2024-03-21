-- DropForeignKey
ALTER TABLE "Puzzle" DROP CONSTRAINT "Puzzle_rewardableId_fkey";

-- DropForeignKey
ALTER TABLE "RewardableConnection" DROP CONSTRAINT "RewardableConnection_childId_fkey";

-- DropForeignKey
ALTER TABLE "RewardableConnection" DROP CONSTRAINT "RewardableConnection_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "UserReward" DROP CONSTRAINT "UserReward_rewardableId_fkey";

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardableConnection" ADD CONSTRAINT "RewardableConnection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Rewardable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardableConnection" ADD CONSTRAINT "RewardableConnection_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Rewardable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("rewardableId") ON DELETE CASCADE ON UPDATE CASCADE;
