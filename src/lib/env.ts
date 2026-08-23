import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_API: z.string().optional().default("http://localhost:8000"),
  NEXT_PUBLIC_DEPLOYED_BACKEND_API: z.string().optional(),
  NEXT_PUBLIC_DEMO_MODE: z
    .enum(["true", "false"])
    .optional()
    .default("false"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .optional()
    .default("development"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API,
  NEXT_PUBLIC_DEPLOYED_BACKEND_API: process.env.NEXT_PUBLIC_DEPLOYED_BACKEND_API,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
  NODE_ENV: process.env.NODE_ENV,
});

export const isDemoMode = env.NEXT_PUBLIC_DEMO_MODE === "true";
export const isProd = env.NODE_ENV === "production";
