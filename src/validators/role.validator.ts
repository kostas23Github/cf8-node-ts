import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(4, "Role name must be at least 4 characters long"),
  description: z.string().optional(),
  active: z.boolean().optional(),
});

export const updateRoleSchema = createRoleSchema.partial();