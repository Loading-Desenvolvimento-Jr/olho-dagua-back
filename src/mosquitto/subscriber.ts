import mqtt    from "mqtt";
import z       from "zod";
import { env } from "../shared/env";

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

  const [, , fountainId, category, metric] = topicParts;

  try {

    const jsonPayload = JSON.parse(message);

    if (category === "metrics") {

      const payload = dataPayloadSchema.parse(jsonPayload);

      if (metric === "temperature") {
        await handleTemperature(fountainId, payload);
      }

      if (metric === "consumption") {
        await handleConsumption(fountainId, payload);
      }

    }

    if (category === "status") {

      const payload = statusPayloadSchema.parse(jsonPayload);

      await handleStatus(fountainId, payload);

    }

  } catch (error) {
    console.error("Error processing MQTT message.", error);
  }

});

async function handleTemperature(fountainId: string, payload: dataPayloadType) {

  console.log(`Temperature payload recive ${fountainId}`);
  console.log(payload);

}

async function handleConsumption(fountainId: string, payload: dataPayloadType) {

  console.log(`Water consume payload recive ${fountainId}`);
  console.log(payload);

}

async function handleStatus(fountainId: string, payload: statusPayloadType) {

  console.log(`Status do bebedouro ${fountainId}`);
  console.log(payload);

}