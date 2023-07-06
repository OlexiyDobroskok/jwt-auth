import { z } from "zod";

export const changePasswordFormSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, { message: "password must be at least 6 characters" }),
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

export const defaultValue: ChangePasswordFormSchema = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};

export type ChangePasswordFormSchema = z.infer<typeof changePasswordFormSchema>;
