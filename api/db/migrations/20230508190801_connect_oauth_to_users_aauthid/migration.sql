-- DropForeignKey
ALTER TABLE "OAuthConnection" DROP CONSTRAINT "OAuthConnection_userId_fkey";

-- AddForeignKey
ALTER TABLE "OAuthConnection" ADD CONSTRAINT "OAuthConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("authId") ON DELETE RESTRICT ON UPDATE CASCADE;
