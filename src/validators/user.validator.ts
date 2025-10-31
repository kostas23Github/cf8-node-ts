import { z } from 'zod';

export const phoneSchema = z.object({
  type: z.string(),
  number: z.string()
});

export const addressSchema = z.object({
  area: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  po: z.string().optional(),
  municipality: z.string().optional()
});

export const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(5, 'Password must be at least 6 characters long'),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().email('Invalid email address'),
  address: addressSchema.optional(),
  phone: z.array(phoneSchema).optional(),
  roles: z.array(z.string()).optional()
});

export const updateUserSchema = createUserSchema.partial(); // All fields of createUserSchema but some are optional.