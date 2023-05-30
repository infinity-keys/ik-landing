/*
  Warnings:

  - The values [HAS_COLLECTED_POST] on the enum `LensCheckType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `collectedPostId` on the `StepLensApi` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LensCheckType_new" AS ENUM ('HAS_COMPLETED_PROFILE', 'HAS_GENESIS_POST', 'IS_FOLLOWING_USER');
ALTER TABLE "StepLensApi" ALTER COLUMN "checkType" TYPE "LensCheckType_new" USING ("checkType"::text::"LensCheckType_new");
ALTER TYPE "LensCheckType" RENAME TO "LensCheckType_old";
ALTER TYPE "LensCheckType_new" RENAME TO "LensCheckType";
DROP TYPE "LensCheckType_old";
COMMIT;

-- AlterTable
ALTER TABLE "StepLensApi" DROP COLUMN "collectedPostId";
