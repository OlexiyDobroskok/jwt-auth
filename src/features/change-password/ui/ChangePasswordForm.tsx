import { type SubmitHandler, useForm } from "react-hook-form";
import {
  changePasswordFormSchema,
  type ChangePasswordFormSchema,
  defaultValue,
} from "../model/changePasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "shared/model";
import { changePasswordThunk } from "../model/changePasswordThunk.ts";
import { type ApiException } from "shared/api";
import { useState } from "react";
import { Input } from "shared/ui";

export const ChangePasswordForm = () => {
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const { getFieldState, register, handleSubmit, setError, reset, formState } =
    useForm<ChangePasswordFormSchema>({
      defaultValues: defaultValue,
      mode: "onTouched",
      resolver: zodResolver(changePasswordFormSchema),
    });
  const dispatch = useAppDispatch();
  const serverErrorType = formState.errors.root?.serverError.type;
  const serverErrorMessage = formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<ChangePasswordFormSchema> = async ({
    password,
    newPassword,
  }) => {
    try {
      const successfulMessage = await dispatch(
        changePasswordThunk({ password, newPassword })
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
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        fieldName="password"
        labelText="password"
        type="password"
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      <Input
        fieldName="newPassword"
        labelText="new password"
        type="password"
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      <Input
        fieldName="confirmNewPassword"
        labelText="confirm new password"
        type="password"
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      {serverErrorType === "unknown" ||
        (serverErrorType === "unauthorized" && <p>{serverErrorMessage}</p>)}
      {successfulMessage && <p>{successfulMessage}</p>}
      <button>submit password</button>
    </form>
  );
};
