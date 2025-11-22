/*
  Warnings:

  - Added the required column `pollingInterval` to the `device_code` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `device_code` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `device_code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "device_code" ADD COLUMN     "pollingInterval" INTEGER NOT NULL,
ADD COLUMN     "scope" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
