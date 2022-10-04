-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "publicAddress" TEXT NOT NULL,
    "nonce" TEXT,
    "email" TEXT,
    "twitterProfile" TEXT,
    "discordProfile" TEXT,
    "lensProfile" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
