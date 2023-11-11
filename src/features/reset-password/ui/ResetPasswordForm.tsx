import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type HttpError } from "shared/api";
import { useAppDispatch } from "shared/store";
import { Input } from "shared/ui/input";

import {
  defaultValues,
  type ResetPasswordFormSchema,
  resetPasswordFormSchema,
} from "../model/resetPasswordFormSchema";
import { resetPasswordThunk } from "../model/resetPasswordThunk";

export const ResetPasswordForm = () => {
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const { getFieldState, register, handleSubmit, setError, reset, formState } =
    useForm<ResetPasswordFormSchema>({
      defaultValues,
      mode: "onTouched",
      resolver: zodResolver(resetPasswordFormSchema),
    });
  const dispatch = useAppDispatch();
  const serverErrorType = formState.errors.root?.serverError.type;
  const serverErrorMessage = formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<ResetPasswordFormSchema> = async (
    resetData
  ) => {
    try {
      const successfulMessage = await dispatch(
        resetPasswordThunk(resetData)
      ).unwrap();
      setSuccessfulMessage(successfulMessage.message);
      reset();
    } catch (error) {
      if ((error as HttpError).status === 400) {
        setError("root.serverError", {
          type: "invalid",
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
        fieldName="email"
        labelText="email"
        type="email"
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      {serverErrorType === "unknown" ||
        (serverErrorType === "invalid" && <p>{serverErrorMessage}</p>)}
      {successfulMessage && <p>{successfulMessage}</p>}
      <button>submit email</button>
    </form>
  );
};
