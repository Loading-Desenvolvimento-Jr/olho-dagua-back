import z    from "zod";
import mqtt from "mqtt";

import { env }               from "../shared/env";
import { dataPayloadSchema } from "./mqtt-types";

import {handleConsumption} from "./handlers";
import {handleTemperature} from "./handlers";

const {
  MQTT_TOPIC_PREFIX,
  MQTT_TEMPERATURE_TOPIC,
  MQTT_CONSUME_TOPIC,
} = env;

const client = mqtt.connect(env.MQTT_BROKER_URL, {
  username: env.MQTT_USER,
  password: env.MQTT_PASSWORD,
});

client.on("connect", () => {

  console.log("Stable MQTT connection!!!");

  client.subscribe(MQTT_TEMPERATURE_TOPIC);
  client.subscribe(MQTT_CONSUME_TOPIC);

});

client.on("message", async (topic, messageBuffer) => {

  const message = messageBuffer.toString();

  console.log(`${topic}: ${message}`);

  if (!topic.startsWith(`${MQTT_TOPIC_PREFIX}/`)) {
    console.warn(`Ignored message from unexpected topic: ${topic}`);
    return;
  }

  const subTopic = topic.replace(`${MQTT_TOPIC_PREFIX}/`, "");
  const [waterFountainId, metric] = subTopic.split("/");

  try {
    const jsonPayload = JSON.parse(message);

    const payload = dataPayloadSchema.parse(jsonPayload);

    switch (metric) {

      case "temperature":
        await handleTemperature(waterFountainId, payload);
        break;

      case "consume":
        await handleConsumption(
          client,
          waterFountainId,
          payload
        );
        break;

      default:
        throw new Error(
          `Unexpected metric: ${metric} with payload ${message}`
        );

    }
  } catch (error) {

    if (error instanceof SyntaxError) {
      console.error(`Invalid JSON payload for topic ${topic}`);
      return;
    }

    if (error instanceof z.ZodError) {
      console.error(
        `Invalid payload for topic ${topic}: ${z.flattenError(error)}`
      );
      return;
    }

    console.error("Error processing MQTT message:", error);

  }
});