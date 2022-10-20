-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "puzzleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
