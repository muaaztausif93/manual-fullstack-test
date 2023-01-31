import { z } from 'zod';

export const PropertySchema = z.object({
  id: z.number(),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).strict();


export type PropertyType = z.infer<typeof PropertySchema>;