import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "shared/model";
import { type ApiException } from "shared/api";
import { Input } from "shared/ui";
import {
  defaultValues,
  newPasswordFormSchema,
  type NewPasswordFormSchema,
} from "../model/newPasswordFormSchema";
import { createNewPasswordThunk } from "../model/createNewPasswordThunk";

interface NewPasswordFormProps {
  resetCode: string;
}

export const NewPasswordForm = ({ resetCode }: NewPasswordFormProps) => {
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const { getFieldState, register, handleSubmit, setError, reset, formState } =
    useForm<NewPasswordFormSchema>({
      defaultValues,
      mode: "onTouched",
      resolver: zodResolver(newPasswordFormSchema),
    });
  const dispatch = useAppDispatch();
  const serverErrorType = formState.errors.root?.serverError.type;
  const serverErrorMessage = formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<NewPasswordFormSchema> = async ({
    newPassword,
  }) => {
    try {
      const successfulMessage = await dispatch(
        createNewPasswordThunk({ newPassword, resetCode })
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
