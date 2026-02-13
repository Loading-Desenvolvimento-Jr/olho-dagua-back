-- CreateTable
CREATE TABLE "WaterFountain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterFountain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterConsumption" (
    "id" SERIAL NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "water_fountain_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterConsumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterTemperature" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "water_fountain_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaterTemperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilterChange" (
    "id" SERIAL NOT NULL,
    "water_fountain_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilterChange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WaterConsumption" ADD CONSTRAINT "WaterConsumption_water_fountain_id_fkey" FOREIGN KEY ("water_fountain_id") REFERENCES "WaterFountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterTemperature" ADD CONSTRAINT "WaterTemperature_water_fountain_id_fkey" FOREIGN KEY ("water_fountain_id") REFERENCES "WaterFountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilterChange" ADD CONSTRAINT "FilterChange_water_fountain_id_fkey" FOREIGN KEY ("water_fountain_id") REFERENCES "WaterFountain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
