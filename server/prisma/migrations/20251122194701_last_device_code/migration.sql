/*
  Warnings:

  - You are about to drop the `deviceCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "deviceCode";

-- CreateTable
CREATE TABLE "device_code" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "clientId" TEXT NOT NULL,
    "deviceCode" TEXT NOT NULL,
    "userCode" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "pollingInterval" INTEGER NOT NULL DEFAULT 5,
    "scope" TEXT,
    "lastPolledAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_code_pkey" PRIMARY KEY ("id")
);
