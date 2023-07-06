import { SubmitHandler, useForm } from "react-hook-form";
import {
  changePasswordFormSchema,
  ChangePasswordFormSchema,
  defaultValue,
} from "../model/changePasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "shared/model";
import { changePasswordThunk } from "../model/changePasswordThunk.ts";
import { ApiException } from "shared/api";
import { useState } from "react";

export const ChangePasswordForm = () => {
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormSchema>({
    defaultValues: defaultValue,
    mode: "onTouched",
    resolver: zodResolver(changePasswordFormSchema),
  });
  const dispatch = useAppDispatch();
  const serverErrorType = errors.root?.serverError.type;
  const serverErrorMessage = errors.root?.serverError.message;

  const onSubmit: SubmitHandler<ChangePasswordFormSchema> = async ({
    newPassword,
  }) => {
    try {
      const successfulMessage = await dispatch(
        changePasswordThunk({ newPassword })
      ).unwrap();
      if (successfulMessage) {
        setSuccessfulMessage(successfulMessage.message);
        reset();
      }
    } catch (error) {
      if ((error as ApiException).status === 401) {
        setError("root.serverError", {
          type: "unauthorized",
          message: (error as ApiException).error,
        });
      } else {
        setError("root.serverError", {
          type: "unknown",
          message: "server error. try again later",
        });
      }

      resetField("newPassword");
      resetField("confirmNewPassword");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("newPassword")} type="password" />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}
      <input {...register("confirmNewPassword")} type="password" />
      {errors.confirmNewPassword && <p>{errors.confirmNewPassword.message}</p>}
      {serverErrorType === "unknown" ||
        (serverErrorType === "unauthorized" && <p>{serverErrorMessage}</p>)}
      {successfulMessage && <p>{successfulMessage}</p>}
      <button>submit password</button>
    </form>
  );
};
