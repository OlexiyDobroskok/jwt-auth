import { type SubmitHandler, useForm } from "react-hook-form";
import {
  editPasswordFormSchema,
  type EditPasswordFormSchema,
  defaultValue,
} from "../model/editPasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "shared/store";
import { editePasswordThunk } from "../model/editePasswordThunk";
import { type HttpError } from "shared/api";
import { useState } from "react";
import { Input } from "shared/ui";

export const ChangePasswordForm = () => {
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const { getFieldState, register, handleSubmit, setError, reset, formState } =
    useForm<EditPasswordFormSchema>({
      defaultValues: defaultValue,
      mode: "onTouched",
      resolver: zodResolver(editPasswordFormSchema),
    });
  const dispatch = useAppDispatch();
  const serverErrorType = formState.errors.root?.serverError.type;
  const serverErrorMessage = formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<EditPasswordFormSchema> = async ({
    password,
    newPassword,
  }) => {
    try {
      const successfulMessage = await dispatch(
        editePasswordThunk({ password, newPassword })
      ).unwrap();
      if (successfulMessage) {
        setSuccessfulMessage(successfulMessage.message);
        reset();
      }
    } catch (error) {
      if ((error as HttpError).status === 401) {
        setError("root.serverError", {
          type: "unauthorized",
          message: (error as HttpError).message,
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
