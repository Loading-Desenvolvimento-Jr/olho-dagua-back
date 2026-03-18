import { dataPayloadType, statusPayloadType } from "./mqtt-types";
import { TemperatureService }            from "../services/TemperatureService";
import { TemperaturePrismaRepository }   from "../repositories/prisma/TemperaturePrismaRepository";
import { WaterFountainPrismaRepository } from "../repositories/prisma/WaterFountainPrismaRepository";
import { WaterFountainService }          from "../services/WaterFountainService";

const temperatureService = new TemperatureService(
  new TemperaturePrismaRepository(),
  new WaterFountainService(
    new WaterFountainPrismaRepository()
  )
);

export async function handleTemperature(waterFountainId: string, payload: dataPayloadType) {

  console.log(`Temperature payload receive ${waterFountainId}`);
  console.log(payload);

  const { value: temperature } = payload;

  try {
    
    await temperatureService.create(temperature, waterFountainId);

  } catch (error) {
    console.error(error);
  }

}

export async function handleConsumption(waterFountainId: string, payload: dataPayloadType) {

  console.log(`Water consume payload receive ${waterFountainId}`);
  console.log(payload);

}

export async function handleStatus(waterFountainId: string, payload: statusPayloadType) {

  console.log(`Status do bebedouro ${waterFountainId}`);
  console.log(payload);

}