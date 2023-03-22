
-- CreateEnum
CREATE TYPE "RewardableType" AS ENUM ('PUZZLE', 'PACK', 'BUNDLE');

-- CreateEnum
CREATE TYPE "AvailableChains" AS ENUM ('AVAX', 'ETH', 'POLY', 'OPT');

-- CreateEnum
CREATE TYPE "StepType" AS ENUM ('SIMPLE_TEXT', 'NFT_CHECK');

-- CreateEnum
CREATE TYPE "SiteRole" AS ENUM ('ADMIN', 'VERIFIED', 'ANONYMOUS');

-- CreateEnum
CREATE TYPE "OrgRole" AS ENUM ('MANAGER', 'MEMBER');

-- CreateTable
CREATE TABLE "Rewardable" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "successMessage" TEXT,
    "listPublicly" BOOLEAN NOT NULL DEFAULT true,
    "type" "RewardableType" NOT NULL,
    "sortWeight" INTEGER DEFAULT 1,
    "orgId" TEXT NOT NULL,
    "availableChains" "AvailableChains"[] DEFAULT ARRAY['AVAX', 'ETH', 'POLY', 'OPT']::"AvailableChains"[],
    "migrateId" TEXT,

    CONSTRAINT "Rewardable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReward" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "rewardableId" TEXT NOT NULL,

    CONSTRAINT "UserReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RewardableConnection" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "childSortWeight" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RewardableConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pack" (
    "id" TEXT NOT NULL,
    "rewardableId" TEXT NOT NULL,

    CONSTRAINT "Pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bundle" (
    "id" TEXT NOT NULL,
    "rewardableId" TEXT NOT NULL,

    CONSTRAINT "Bundle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" TEXT NOT NULL,
    "isAnon" BOOLEAN NOT NULL DEFAULT false,
    "rewardableId" TEXT NOT NULL,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "failMessage" TEXT,
    "successMessage" TEXT,
    "challenge" TEXT,
    "resourceLinks" TEXT,
    "stepSortWeight" INTEGER NOT NULL DEFAULT 1,
    "puzzleId" TEXT NOT NULL,
    "type" "StepType" NOT NULL DEFAULT 'SIMPLE_TEXT',
    "migrateLandingRoute" TEXT,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepSimpleText" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "solutionCharCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StepSimpleText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NftCheckDatum" (
    "id" TEXT NOT NULL,
    "contractAddress" TEXT,
    "tokenId" INTEGER,
    "chainId" INTEGER,
    "poapEventId" TEXT,
    "stepNftCheckId" TEXT,

    CONSTRAINT "NftCheckDatum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepNftCheck" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "requireAllNfts" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StepNftCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB NOT NULL,
    "puzzleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solve" (
    "id" TEXT NOT NULL,
    "solvedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "data" JSONB DEFAULT '{}',

    CONSTRAINT "Solve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nft" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "contractName" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "cloudinaryId" TEXT NOT NULL,

    CONSTRAINT "Nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoggedIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nonce" TEXT NOT NULL,
    "authId" TEXT,
    "username" TEXT,
    "email" TEXT,
    "twitterProfile" TEXT,
    "discordProfile" TEXT,
    "lensProfile" TEXT,
    "roles" "SiteRole"[] DEFAULT ARRAY['ANONYMOUS']::"SiteRole"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationUser" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userOrgRole" "OrgRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NftToRewardable" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_NftToUserReward" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Rewardable_migrateId_key" ON "Rewardable"("migrateId");

-- CreateIndex
CREATE UNIQUE INDEX "Rewardable_slug_type_key" ON "Rewardable"("slug", "type");

-- CreateIndex
CREATE UNIQUE INDEX "UserReward_userId_rewardableId_key" ON "UserReward"("userId", "rewardableId");

-- CreateIndex
CREATE INDEX "RewardableConnection_parentId_childId_childSortWeight_idx" ON "RewardableConnection"("parentId", "childId", "childSortWeight" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "RewardableConnection_parentId_childId_key" ON "RewardableConnection"("parentId", "childId");

-- CreateIndex
CREATE UNIQUE INDEX "Pack_rewardableId_key" ON "Pack"("rewardableId");

-- CreateIndex
CREATE UNIQUE INDEX "Bundle_rewardableId_key" ON "Bundle"("rewardableId");

-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_rewardableId_key" ON "Puzzle"("rewardableId");

-- CreateIndex
CREATE UNIQUE INDEX "Step_migrateLandingRoute_key" ON "Step"("migrateLandingRoute");

-- CreateIndex
CREATE UNIQUE INDEX "Step_puzzleId_stepSortWeight_key" ON "Step"("puzzleId", "stepSortWeight" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "StepSimpleText_stepId_key" ON "StepSimpleText"("stepId");

-- CreateIndex
CREATE UNIQUE INDEX "StepNftCheck_stepId_key" ON "StepNftCheck"("stepId");

-- CreateIndex
CREATE UNIQUE INDEX "Submission_puzzleId_userId_key" ON "Submission"("puzzleId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Attempt_stepId_userId_attemptedAt_key" ON "Attempt"("stepId", "userId", "attemptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Solve_attemptId_key" ON "Solve"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "Solve_userId_attemptId_key" ON "Solve"("userId", "attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "Nft_contractName_tokenId_key" ON "Nft"("contractName", "tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationUser_orgId_userId_key" ON "OrganizationUser"("orgId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_NftToRewardable_AB_unique" ON "_NftToRewardable"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToRewardable_B_index" ON "_NftToRewardable"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NftToUserReward_AB_unique" ON "_NftToUserReward"("A", "B");

-- CreateIndex
CREATE INDEX "_NftToUserReward_B_index" ON "_NftToUserReward"("B");

-- AddForeignKey
ALTER TABLE "Rewardable" ADD CONSTRAINT "Rewardable_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReward" ADD CONSTRAINT "UserReward_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardableConnection" ADD CONSTRAINT "RewardableConnection_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RewardableConnection" ADD CONSTRAINT "RewardableConnection_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pack" ADD CONSTRAINT "Pack_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Puzzle" ADD CONSTRAINT "Puzzle_rewardableId_fkey" FOREIGN KEY ("rewardableId") REFERENCES "Rewardable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepSimpleText" ADD CONSTRAINT "StepSimpleText_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NftCheckDatum" ADD CONSTRAINT "NftCheckDatum_stepNftCheckId_fkey" FOREIGN KEY ("stepNftCheckId") REFERENCES "StepNftCheck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepNftCheck" ADD CONSTRAINT "StepNftCheck_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("rewardableId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solve" ADD CONSTRAINT "Solve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solve" ADD CONSTRAINT "Solve_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToRewardable" ADD CONSTRAINT "_NftToRewardable_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToRewardable" ADD CONSTRAINT "_NftToRewardable_B_fkey" FOREIGN KEY ("B") REFERENCES "Rewardable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToUserReward" ADD CONSTRAINT "_NftToUserReward_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NftToUserReward" ADD CONSTRAINT "_NftToUserReward_B_fkey" FOREIGN KEY ("B") REFERENCES "UserReward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

