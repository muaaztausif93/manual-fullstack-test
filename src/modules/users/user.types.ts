import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  type: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).strict();


export type UserType = z.infer<typeof UserSchema>;

export const userSignUpSchema = z.object({
  name: z.string().nonempty('name field is required'),
  email: z.string().nonempty('Email field is required').email(),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  type: z.string().nonempty()
}).strict();

export const userSignInSchema = z.object({
  email: z.string().nonempty('email field is required').email(),
  password: z.string(),
}).strict();