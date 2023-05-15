-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "betaAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "blocked" BOOLEAN,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "imageSrc" TEXT,
ADD COLUMN     "mfa_enabled" BOOLEAN,
ADD COLUMN     "refreshToken" TEXT;

-- CreateTable
CREATE TABLE "OAuth" (
    "state" TEXT NOT NULL,
    "codeChallenge" TEXT NOT NULL,
    "codeVerifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("state")
);

-- CreateTable
CREATE TABLE "OAuthConnection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,
    "accessToken" TEXT NOT NULL,
    "expiration" TIMESTAMP(3),

    CONSTRAINT "OAuthConnection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthConnection" ADD CONSTRAINT "OAuthConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
