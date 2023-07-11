-- CreateTable
CREATE TABLE "DiscordConnection" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "discordId" TEXT NOT NULL,

    CONSTRAINT "DiscordConnection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordConnection_userId_key" ON "DiscordConnection"("userId");

-- AddForeignKey
ALTER TABLE "DiscordConnection" ADD CONSTRAINT "DiscordConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
