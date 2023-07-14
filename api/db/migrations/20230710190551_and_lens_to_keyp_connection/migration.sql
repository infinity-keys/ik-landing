-- CreateTable
CREATE TABLE "LensKeypConnection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "lensAddress" TEXT NOT NULL,
    "keypAddress" TEXT NOT NULL,

    CONSTRAINT "LensKeypConnection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LensKeypConnection" ADD CONSTRAINT "LensKeypConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("authId") ON DELETE RESTRICT ON UPDATE CASCADE;
