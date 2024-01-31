import * as z from "zod";

export const JobSchema = z.object({
  position: z.string().min(3).max(40),
  shortDesc: z.string().min(5).max(100),
  description: z.string().min(10).max(1000),
  city: z.string().min(3).max(25),
  type: z.string().min(3).max(25),
  industry: z.string().min(2).max(25),
  company: z.string().min(3).max(25),
  experience: z.coerce.number().min(0),
});
