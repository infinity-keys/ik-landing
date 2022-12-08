-- CreateTable
CREATE TABLE "UserPuzzle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT,
    "imageUrl" TEXT,

    CONSTRAINT "UserPuzzle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPuzzle" ADD CONSTRAINT "UserPuzzle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
