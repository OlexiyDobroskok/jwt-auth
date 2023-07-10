import { z } from "zod";

export const loginFormSchema = z
  .object({
    email: z.string().email({ message: "must be a valid" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "must be at least 6 characters" }),
  })
  .required();

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const defaultValues: LoginFormSchema = {
  email: "",
  password: "",
};
