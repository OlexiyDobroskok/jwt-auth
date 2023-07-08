import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { type HttpError } from "shared/api";
import { appRoutes } from "shared/config";
import { useAppDispatch } from "shared/store";
import { Input } from "shared/ui";

import {
  defaultValues,
  type RegistrationFormSchema,
  registrationFormSchema,
} from "../../model/registrationFormSchema";
import { registrationThunk } from "../../model/registrationThunk";

import classes from "./RegistrationForm.module.scss";

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
  const serverErrorType = formState.errors.root?.serverError.type;
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
    <form
      className={classes.registrationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        fieldName="userName"
        labelText="username"
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
      <Input
        type="email"
        fieldName="email"
        labelText="email"
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
      <Input
        type="password"
        fieldName="password"
        labelText="password"
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
      <Input
        type="password"
        fieldName="confirmPassword"
        labelText="confirm password"
        register={register}
        formState={formState}
        getFieldState={getFieldState}
      />
      {serverErrorType === "unknown" ||
        (serverErrorType === "conflict" && <p>{serverErrorMessage}</p>)}
      <button>submit</button>
    </form>
  );
};
