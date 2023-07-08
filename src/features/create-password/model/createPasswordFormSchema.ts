import { z } from "zod";

export const createPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, { message: "password must be at least 6 characters" }),
    confirmNewPassword: z
      .string()
      .trim()
      .min(6, { message: "password must be at least 6 characters" }),
  })
  .required()
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: "Passwords don't match",
      path: ["confirmNewPassword"],
    }
  );

export const defaultValues: CreatePasswordFormSchema = {
  newPassword: "",
  confirmNewPassword: "",
};

export type CreatePasswordFormSchema = z.infer<typeof createPasswordFormSchema>;
