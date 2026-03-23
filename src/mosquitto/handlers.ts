import { dataPayloadType, statusPayloadType } from "./mqtt-types";
import { TemperatureService }            from "../services/TemperatureService";
import { TemperaturePrismaRepository }   from "../repositories/prisma/TemperaturePrismaRepository";
import { WaterFountainPrismaRepository } from "../repositories/prisma/WaterFountainPrismaRepository";
import { WaterFountainService }          from "../services/WaterFountainService";
import { FilterChangeService } from "../services/FilterChangeService";
import { FilterChangePrismaRepository } from "../repositories/prisma/FilterChangePrismaRepository";
import { ConsumptionService } from "../services/ConsumptionService";
import { ConsumptionPrismaRepository } from "../repositories/prisma/ConsumptionPrismaRepository";

const waterFountainService = new WaterFountainService(
  new WaterFountainPrismaRepository()
);

const temperatureService = new TemperatureService(
  new TemperaturePrismaRepository(),
  waterFountainService
);

const filterChangeService = new FilterChangeService(
  new FilterChangePrismaRepository(),
  waterFountainService
);

const consumptionService = new ConsumptionService(
  new ConsumptionPrismaRepository(),
  waterFountainService,
  filterChangeService
);

export async function handleTemperature(waterFountainId: string, payload: dataPayloadType) {

  console.log(`Temperature payload recive ${waterFountainId}`);
  console.log(payload);

  const { value: temperature } = payload;

  try {
    
    await temperatureService.create(temperature, waterFountainId);

  } catch (error) {
    console.error(error);
  }

}

export async function handleConsumption(waterFountainId: string, payload: dataPayloadType) {

  console.log(`Water consume payload recive ${waterFountainId}`);
  console.log(payload);

  const { value: volume } = payload;

  try {
    
    await consumptionService.create(volume, waterFountainId);

  } catch (error) {
    console.error(error);
  }

}

export async function handleStatus(waterFountainId: string, payload: statusPayloadType) {

  console.log(`Status do bebedouro ${waterFountainId}`);
  console.log(payload);

}
