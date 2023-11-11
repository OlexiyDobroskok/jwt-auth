import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { type HttpError } from "shared/api";
import { appRoutes } from "shared/config";
import { useAppDispatch } from "shared/store";
import { AccForm } from "shared/ui/acc-form";
import { accIcons } from "shared/ui/icon";
import { Input } from "shared/ui/input";

import {
  type CreatePasswordFormSchema,
  createPasswordFormSchema,
  defaultValues,
} from "../model/createPasswordFormSchema.ts";
import { createPasswordThunk } from "../model/createPasswordThunk.ts";

interface CreatePasswordFormProps {
  resetCode: string;
}

export const CreatePasswordForm = ({ resetCode }: CreatePasswordFormProps) => {
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const { getFieldState, register, reset, handleSubmit, setError, formState } =
    useForm<CreatePasswordFormSchema>({
      defaultValues,
      mode: "onTouched",
      resolver: zodResolver(createPasswordFormSchema),
    });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const serverErrorMessage = formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<CreatePasswordFormSchema> = async ({
    newPassword,
  }) => {
    try {
      const successfulMessage = await dispatch(
        createPasswordThunk({ newPassword, resetCode })
      ).unwrap();
      setSuccessfulMessage(successfulMessage.message);
      reset({}, { keepErrors: true });
      window.setTimeout(() => {
        navigate(appRoutes.ACCOUNT, { replace: true });
      }, 3000);
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
      reset({}, { keepErrors: true });
      window.setTimeout(() => {
        navigate(appRoutes.ROOT, { replace: true });
      }, 3000);
    }
  };

  return (
    <AccForm
      onSubmit={handleSubmit(onSubmit)}
      serverErrorMessage={serverErrorMessage}
      successfulMessage={successfulMessage}
      submitButtonName="save password"
    >
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
