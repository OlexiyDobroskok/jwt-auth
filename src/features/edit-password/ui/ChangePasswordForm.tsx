import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type HttpError } from "shared/api";
import { useAppDispatch } from "shared/store";
import { AccForm } from "shared/ui/acc-form";
import { accIcons } from "shared/ui/icon";
import { Input } from "shared/ui/input";

import { editePasswordThunk } from "../model/editePasswordThunk";
import {
  defaultValue,
  type EditPasswordFormSchema,
  editPasswordFormSchema,
} from "../model/editPasswordFormSchema";

export const ChangePasswordForm = () => {
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const { getFieldState, register, handleSubmit, setError, reset, formState } =
    useForm<EditPasswordFormSchema>({
      defaultValues: defaultValue,
      mode: "onTouched",
      resolver: zodResolver(editPasswordFormSchema),
    });
  const dispatch = useAppDispatch();
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
    <AccForm
      onSubmit={handleSubmit(onSubmit)}
      serverErrorMessage={serverErrorMessage}
      successfulMessage={successfulMessage}
      submitButtonName="change password"
    >
      <Input
        fieldName="password"
        labelText="password"
        type="password"
        icon={`${accIcons}#password`}
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      <Input
        fieldName="newPassword"
        labelText="new password"
        type="password"
        icon={`${accIcons}#password`}
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      <Input
        fieldName="confirmNewPassword"
        labelText="confirm new password"
        type="password"
        icon={`${accIcons}#password`}
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
    </AccForm>
  );
};
