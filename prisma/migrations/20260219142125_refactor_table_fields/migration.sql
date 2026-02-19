/*
  Warnings:

  - The primary key for the `FilterChange` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `FilterChange` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `FilterChange` table. All the data in the column will be lost.
  - You are about to drop the column `water_fountain_id` on the `FilterChange` table. All the data in the column will be lost.
  - The primary key for the `WaterConsumption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `WaterConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `WaterConsumption` table. All the data in the column will be lost.
  - You are about to drop the column `water_fountain_id` on the `WaterConsumption` table. All the data in the column will be lost.
  - The primary key for the `WaterFountain` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `WaterFountain` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `WaterFountain` table. All the data in the column will be lost.
  - The primary key for the `WaterTemperature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `WaterTemperature` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `WaterTemperature` table. All the data in the column will be lost.
  - You are about to drop the column `water_fountain_id` on the `WaterTemperature` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `FilterChange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterFountainId` to the `FilterChange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WaterConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterFountainId` to the `WaterConsumption` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WaterFountain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WaterTemperature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterFountainId` to the `WaterTemperature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FilterChange" DROP CONSTRAINT "FilterChange_water_fountain_id_fkey";

-- DropForeignKey
ALTER TABLE "WaterConsumption" DROP CONSTRAINT "WaterConsumption_water_fountain_id_fkey";

-- DropForeignKey
ALTER TABLE "WaterTemperature" DROP CONSTRAINT "WaterTemperature_water_fountain_id_fkey";

-- AlterTable
ALTER TABLE "FilterChange" DROP CONSTRAINT "FilterChange_pkey",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "water_fountain_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "waterFountainId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FilterChange_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FilterChange_id_seq";

-- AlterTable
ALTER TABLE "WaterConsumption" DROP CONSTRAINT "WaterConsumption_pkey",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "water_fountain_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "waterFountainId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WaterConsumption_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WaterConsumption_id_seq";

-- AlterTable
ALTER TABLE "WaterFountain" DROP CONSTRAINT "WaterFountain_pkey",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WaterFountain_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WaterFountain_id_seq";

-- AlterTable
ALTER TABLE "WaterTemperature" DROP CONSTRAINT "WaterTemperature_pkey",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "water_fountain_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "waterFountainId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WaterTemperature_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WaterTemperature_id_seq";

-- AddForeignKey
ALTER TABLE "WaterConsumption" ADD CONSTRAINT "WaterConsumption_waterFountainId_fkey" FOREIGN KEY ("waterFountainId") REFERENCES "WaterFountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterTemperature" ADD CONSTRAINT "WaterTemperature_waterFountainId_fkey" FOREIGN KEY ("waterFountainId") REFERENCES "WaterFountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterChange" ADD CONSTRAINT "FilterChange_waterFountainId_fkey" FOREIGN KEY ("waterFountainId") REFERENCES "WaterFountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
