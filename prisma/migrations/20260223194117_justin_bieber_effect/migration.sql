/*
  Warnings:

  - Added the required column `temperature` to the `WaterFountain` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FilterStatus" AS ENUM ('EXCELLENT', 'ATTENTION', 'GOOD', 'TO_REPLACE');

-- AlterTable
ALTER TABLE "WaterFountain" ADD COLUMN     "filterStatus" "FilterStatus" NOT NULL DEFAULT 'GOOD',
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL;
