import { z } from "zod";

export const registrationFormSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(4, { message: "username must be at least 4 characters" }),
    email: z.string().email({ message: "email must be a valid" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "password must be at least 6 characters" }),
  })
  .required()
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;
export const defaultValues: RegistrationFormSchema = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
