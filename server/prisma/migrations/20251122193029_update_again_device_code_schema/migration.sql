-- DropIndex
DROP INDEX "device_code_deviceCode_key";

-- DropIndex
DROP INDEX "device_code_userCode_key";

-- AlterTable
ALTER TABLE "device_code" ADD COLUMN     "lastPolledAt" TIMESTAMP(3),
ALTER COLUMN "scope" DROP NOT NULL;
