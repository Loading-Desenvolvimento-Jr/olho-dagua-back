import mqtt                              from "mqtt";
import { env }                           from "../shared/env";

import { dataPayloadSchema, statusPayloadSchema } from "./mqtt-types";
import z from "zod";
import { handleConsumption, handleStatus, handleTemperature } from "./handlers";



const MQTT_PREFIX = env.MQTT_TOPIC_PREFIX;
const MQTT_SUBSCRIBER_TOPICS = {
  METRICS: `${MQTT_PREFIX}${env.MQTT_SUBSCRIBER_METRICS}`,
  STATUS:  `${MQTT_PREFIX}${env.MQTT_SUBSCRIBER_STATUS}`,
};

const client = mqtt.connect(env.MQTT_BROKER_URL, {
  username: env.MQTT_USER,
  password: env.MQTT_PASSWORD
});

client.on("connect", () => {

  console.log("Stable MQTT connection");

  client.subscribe(MQTT_SUBSCRIBER_TOPICS.METRICS);
  client.subscribe(MQTT_SUBSCRIBER_TOPICS.STATUS);

});

client.on("message", async (topic, messageBuffer) => {

  const message = messageBuffer.toString();

  console.log(`${topic}: ${message}`);

  if (!topic.startsWith(MQTT_PREFIX)) {
    console.warn(`Ignored message from unexpected topic: ${topic}`);
    return;
  }

  const subTopic = topic.replace(`${MQTT_PREFIX}/`, "");
  const topicParts = subTopic.split("/");

  const [waterFountainId, category, metric] = topicParts;

  try {

    const jsonPayload = JSON.parse(message);

    if (category === "metrics") {

      const payload = dataPayloadSchema.parse(jsonPayload);

      switch (metric) {
        case "temperature":
          await handleTemperature(waterFountainId, payload);
          break;
        case "consumption":
          await handleConsumption(waterFountainId, payload);
          break;
        default:
          throw new Error(`Unexpected metric data: ${metric} with payload ${message}`);
      }

    } else if (category === "status") {

      const payload = statusPayloadSchema.parse(jsonPayload);

      await handleStatus(waterFountainId, payload);

    }

  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(`Invalid JSON payload for topic ${topic}`);
      return;
    }

    if (error instanceof z.ZodError) {
      console.error(`Invalid payload for topic ${topic}: ${z.flattenError(error)}`);
      return;
    }

    console.error("Error processing MQTT message:", error);
  }

});
