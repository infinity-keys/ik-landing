/*
  Warnings:

  - The values [ERC20_BALANCEp] on the enum `StepType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StepType_new" AS ENUM ('SIMPLE_TEXT', 'NFT_CHECK', 'FUNCTION_CALL', 'COMETH_API', 'TOKEN_ID_RANGE', 'ORIUM_API', 'LENS_API', 'ASSET_TRANSFER', 'ERC20_BALANCE');
ALTER TABLE "Step" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Step" ALTER COLUMN "type" TYPE "StepType_new" USING ("type"::text::"StepType_new");
ALTER TYPE "StepType" RENAME TO "StepType_old";
ALTER TYPE "StepType_new" RENAME TO "StepType";
DROP TYPE "StepType_old";
ALTER TABLE "Step" ALTER COLUMN "type" SET DEFAULT 'SIMPLE_TEXT';
COMMIT;
