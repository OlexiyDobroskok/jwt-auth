import { z } from "zod";

const envVariables = z.object({
  VITE_SESSION_API_ENDPOINT: z.string().url(),
});

envVariables.parse(import.meta.env);

declare global {
  interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}

export const appConfig = {
  SESSION_API_ENDPOINT: import.meta.env.VITE_SESSION_API_ENDPOINT,
};
