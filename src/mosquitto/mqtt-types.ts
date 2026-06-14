import z from "zod";

export const dataPayloadSchema = z.object({
  value: z.number()
});

export type DataPayloadType = z.infer<typeof dataPayloadSchema>;
