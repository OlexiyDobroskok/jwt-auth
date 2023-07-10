import { z } from "zod";

export const editPasswordFormSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, { message: "must be at least 6 characters" }),
    newPassword: z
      .string()
      .trim()
      .min(6, { message: "must be at least 6 characters" }),
    confirmNewPassword: z.string(),
  })
  .required()
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: "passwords don't match",
      path: ["confirmNewPassword"],
    }
  );

export const defaultValue: EditPasswordFormSchema = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};

export type EditPasswordFormSchema = z.infer<typeof editPasswordFormSchema>;
