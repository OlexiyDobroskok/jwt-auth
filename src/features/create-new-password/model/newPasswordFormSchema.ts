import { z } from "zod";

export const newPasswordFormSchema = z
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

export const defaultValues: NewPasswordFormSchema = {
  newPassword: "",
  confirmNewPassword: "",
};

export type NewPasswordFormSchema = z.infer<typeof newPasswordFormSchema>;
