import mqtt                              from "mqtt";
import z                                 from "zod";
import { env }                           from "../shared/env";
import { TemperatureService }            from "../services/TemperatureService";
import { TemperaturePrismaRepository }   from "../repositories/prisma/TemperaturePrismaRepository";
import { WaterFountainPrismaRepository } from "../repositories/prisma/WaterFountainPrismaRepository";
import { WaterFountainService }          from "../services/WaterFountainService";

const dataPayloadSchema = z.object({
  value:     z.number(),
  timestamp: z.date()
});

type dataPayloadType = z.infer<typeof dataPayloadSchema>;

const statusPayloadSchema = z.object({
  status:    z.enum(["on", "off"]),
  timestamp: z.date()
});

type statusPayloadType = z.infer<typeof statusPayloadSchema>;

const temperatureService = new TemperatureService(
  new TemperaturePrismaRepository(),
  new WaterFountainService(
    new WaterFountainPrismaRepository()
  )
);

const client = mqtt.connect(env.MQTT_BROKER_URL, {
  username: env.MQTT_USER,
  password: env.MQTT_PASSWORD
});

client.on("connect", () => {

  console.log("Stable MQTT connection");

  client.subscribe("olho-dagua/water-fountain/+/metrics/+");
  client.subscribe("olho-dagua/water-fountain/+/status");

});

client.on("message", async (topic, messageBuffer) => {

  const message = messageBuffer.toString();

  console.log(`${topic}: ${message}`);

  const topicParts = topic.split("/");

  if (topicParts.length < 4) return;

  const [, , waterFountainId, category, metric] = topicParts;

  try {

    const jsonPayload = JSON.parse(message);

    if (category === "metrics") {

      const payload = dataPayloadSchema.parse(jsonPayload);

      if (metric === "temperature") {
        await handleTemperature(waterFountainId, payload);
      }

      if (metric === "consumption") {
        await handleConsumption(waterFountainId, payload);
      }

    }

    if (category === "status") {

      const payload = statusPayloadSchema.parse(jsonPayload);

      await handleStatus(waterFountainId, payload);

    }

  } catch (error) {
    console.error("Error processing MQTT message.", error);
  }

});

async function handleTemperature(waterFountainId: string, payload: dataPayloadType) {

  console.log(`Temperature payload recive ${waterFountainId}`);
  console.log(payload);

  const { value: temperature } = payload;

  try {
    
    await temperatureService.create(temperature, waterFountainId);

  } catch (error) {
    console.error(error);
  }

}

async function handleConsumption(waterFountainId: string, payload: dataPayloadType) {

  console.log(`Water consume payload recive ${waterFountainId}`);
  console.log(payload);

}

async function handleStatus(waterFountainId: string, payload: statusPayloadType) {

  console.log(`Status do bebedouro ${waterFountainId}`);
  console.log(payload);

}