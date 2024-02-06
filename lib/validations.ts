import * as z from "zod";

export const JobSchema = z.object({
  position: z
    .string()
    .min(3, "Position must be at least 3 characters long")
    .max(40, "Position must be at most 40 characters long"),
  shortDesc: z
    .string()
    .min(5, "Short description must be at least 5 characters long")
    .max(100, "Short description must be at most 100 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  city: z
    .string()
    .min(3, "City must be at least 3 characters long")
    .max(25, "City must be at most 25 characters long"),
  type: z
    .string()
    .min(3, "Type must be at least 3 characters long")
    .max(25, "Type must be at most 25 characters long"),
  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters long")
    .max(25, "Industry must be at most 25 characters long"),
  company: z
    .string()
    .min(3, "Company must be at least 3 characters long")
    .max(25, "Company must be at most 25 characters long"),
  experience: z.number().min(0, "Experience must be a non-negative number"),
});
