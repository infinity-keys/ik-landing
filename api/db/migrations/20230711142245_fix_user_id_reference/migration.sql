-- DropForeignKey
ALTER TABLE "LensKeypConnection" DROP CONSTRAINT "LensKeypConnection_userId_fkey";

-- DropIndex
DROP INDEX "LensKeypConnection_id_userId_key";

-- AddForeignKey
ALTER TABLE "LensKeypConnection" ADD CONSTRAINT "LensKeypConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
