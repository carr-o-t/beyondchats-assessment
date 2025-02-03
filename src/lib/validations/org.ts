import { z } from "zod";

export const organisationSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    websiteUrl: z.string().url("Invalid URL"),
    description: z.string().min(10, "Description must be at least 10 characters"),
  });