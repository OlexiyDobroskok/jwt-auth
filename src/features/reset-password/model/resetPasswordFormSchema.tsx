import { z } from "zod";

export const resetPasswordFormSchema = z
  .object({
    email: z.string().email({ message: "email must be a valid" }),
  })
  .required();

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;

export const defaultValues: ResetPasswordFormSchema = {
  email: "",
};
