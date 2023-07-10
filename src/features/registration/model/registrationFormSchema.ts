import { z } from "zod";

export const registrationFormSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(4, { message: "must be at least 4 characters" }),
    email: z.string().email({ message: "must be a valid" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .required()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"],
  });

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;
export const defaultValues: RegistrationFormSchema = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
