import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import type { HttpError } from "shared/api";
import { appRoutes } from "shared/config";
import { useAppDispatch } from "shared/store";
import { AccForm } from "shared/ui/acc-form";
import { accIcons } from "shared/ui/icon";
import { Input } from "shared/ui/input";

import {
  defaultValues,
  type RegistrationFormSchema,
  registrationFormSchema,
} from "../../model/registrationFormSchema";
import { registrationThunk } from "../../model/registrationThunk";

export const RegistrationForm = () => {
  const {
    register,
    resetField,
    getFieldState,
    setError,
    formState,
    handleSubmit,
  } = useForm<RegistrationFormSchema>({
    defaultValues,
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const serverErrorMessage = formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<RegistrationFormSchema> = async ({
    userName,
    email,
    password,
  }) => {
    try {
      await dispatch(registrationThunk({ userName, email, password })).unwrap();
      navigate(appRoutes.PROFILE);
    } catch (error) {
      if ((error as HttpError).status === 409) {
        setError(
          "email",
          { type: "conflict", message: (error as HttpError).message },
          { shouldFocus: true }
        );
      } else {
        setError("root.serverError", {
          type: "unknown",
          message: "server error. try again later",
        });
      }
      resetField("password");
      resetField("confirmPassword");
    }
  };

  return (
    <AccForm
      onSubmit={handleSubmit(onSubmit)}
      serverErrorMessage={serverErrorMessage}
      submitButtonName="sign up"
    >
      <Input
        type="text"
        fieldName="userName"
        labelText="username"
        icon={`${accIcons}#user`}
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
      <Input
        type="email"
        fieldName="email"
        labelText="email"
        icon={`${accIcons}#email`}
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
      <Input
        type="password"
        fieldName="password"
        labelText="password"
        icon={`${accIcons}#password`}
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
      <Input
        type="password"
        fieldName="confirmPassword"
        labelText="confirm password"
        icon={`${accIcons}#password`}
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
    </AccForm>
  );
};
