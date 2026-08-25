import { env }             from "../shared/env";
import { MqttClient }      from "mqtt";
import { DataPayloadType } from "./mqtt-types";

import { TemperaturePrismaRepository }   from  "../repositories/prisma/TemperaturePrismaRepository";
import { WaterFountainPrismaRepository } from  "../repositories/prisma/WaterFountainPrismaRepository";
import { FilterChangePrismaRepository }  from  "../repositories/prisma/FilterChangePrismaRepository";
import { ConsumptionPrismaRepository }   from  "../repositories/prisma/ConsumptionPrismaRepository";

import { TemperatureService }   from  "../services/TemperatureService";
import { WaterFountainService } from  "../services/WaterFountainService";
import { FilterChangeService }  from  "../services/FilterChangeService";
import { ConsumptionService }   from  "../services/ConsumptionService";

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

export async function handleTemperature(
  waterFountainId: string, 
  payload:         DataPayloadType
) {

  console.log(`Temperature payload recive ${waterFountainId}`);
  console.log(payload);

  const { value: temperature } = payload;

  try {
    
    await temperatureService.create(temperature, waterFountainId);

  } catch (error) {
    console.error(error);
  }

}

export async function handleConsumption(
  client:          MqttClient, 
  waterFountainId: string, 
  payload:         DataPayloadType
) {

  console.log(`Water consume payload recive ${waterFountainId}`);
  console.log(payload);

  const { value: volume } = payload;

  try {
    
    await consumptionService.create(volume, waterFountainId);

    const waterFountain = await waterFountainService.findById(waterFountainId);
    
    client.publish(
      `${env.MQTT_TOPIC_PREFIX}/${waterFountainId}/filter`,
      waterFountain.filterStatus,
      { retain: true }
    );

  } catch (error) {
    console.error(error);
  }

}
