import z from "zod";

export const dataPayloadSchema = z.object({
  value:     z.number(),
  timestamp: z.coerce.date()
});

export type dataPayloadType = z.infer<typeof dataPayloadSchema>;

export const statusPayloadSchema = z.object({
  status:    z.enum(["on", "off"]),
  timestamp: z.coerce.date()
});

export type statusPayloadType = z.infer<typeof statusPayloadSchema>;

