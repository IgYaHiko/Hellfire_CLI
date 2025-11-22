-- CreateTable
CREATE TABLE "device_code" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "clientId" TEXT NOT NULL,
    "deviceCode" TEXT NOT NULL,
    "userCode" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "device_code_deviceCode_key" ON "device_code"("deviceCode");

-- CreateIndex
CREATE UNIQUE INDEX "device_code_userCode_key" ON "device_code"("userCode");
