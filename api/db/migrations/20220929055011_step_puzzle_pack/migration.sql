-- CreateTable
CREATE TABLE "Pack" (
    "packId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "nftId" INTEGER NOT NULL,
    "listPublicly" BOOLEAN NOT NULL DEFAULT true,
    "sortWeight" INTEGER NOT NULL,

    CONSTRAINT "Pack_pkey" PRIMARY KEY ("packId")
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "puzzleId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "successMessage" TEXT,
    "listPublicly" BOOLEAN NOT NULL DEFAULT true,
    "sortWeight" INTEGER NOT NULL,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("puzzleId")
);

-- CreateTable
CREATE TABLE "Step" (
    "stepId" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "failMessage" TEXT,
    "successMessage" TEXT,
    "instructions" TEXT,
    "challenge" TEXT,
    "order" INTEGER NOT NULL,
    "puzzleId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("stepId")
);

-- CreateTable
CREATE TABLE "_PackToPuzzle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PackToPuzzle_AB_unique" ON "_PackToPuzzle"("A", "B");

-- CreateIndex
CREATE INDEX "_PackToPuzzle_B_index" ON "_PackToPuzzle"("B");

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("puzzleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackToPuzzle" ADD CONSTRAINT "_PackToPuzzle_A_fkey" FOREIGN KEY ("A") REFERENCES "Pack"("packId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackToPuzzle" ADD CONSTRAINT "_PackToPuzzle_B_fkey" FOREIGN KEY ("B") REFERENCES "Puzzle"("puzzleId") ON DELETE CASCADE ON UPDATE CASCADE;
