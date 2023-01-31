import { z } from 'zod';

export const OpenHouseSchema = z.object({
  id: z.number(),
  visitorAmount: z.number(),
  propertyId: z.number(),
  startDate: z.date(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).strict();


export type OpenHouseType = z.infer<typeof OpenHouseSchema>;