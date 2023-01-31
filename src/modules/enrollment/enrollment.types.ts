import { z } from 'zod';

export const EnrollmentsSchema = z.object({
  id: z.number(),
  userId: z.number(),
  openHouseId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).strict();


export type EnrollmentsType = z.infer<typeof EnrollmentsSchema>;