import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { type HttpError } from "shared/api";
import { appRoutes } from "shared/config";
import { useAppDispatch } from "shared/store";
import { AccForm } from "shared/ui/acc-form";
import { AppLink } from "shared/ui/app-link";
import { accIcons } from "shared/ui/icon";
import { Input } from "shared/ui/input";

import {
  defaultValues,
  type LoginFormSchema,
  loginFormSchema,
} from "../model/loginFormSchema";
import { loginThunk } from "../model/loginThunk";

import classes from "./LoginForm.module.scss";

export const LoginForm = () => {
  const {
    register,
    resetField,
    handleSubmit,
    formState,
    setError,
    getFieldState,
  } = useForm<LoginFormSchema>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(loginFormSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const serverErrorMessage = formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<LoginFormSchema> = async (loginData) => {
    try {
      await dispatch(loginThunk(loginData)).unwrap();
      navigate(appRoutes.PROFILE);
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

      resetField("password");
    }
  };

  const resetPassBlock = (
    <div className={classes.resetPass}>
      <AppLink to={appRoutes.RESET_PASS}>Forgot Password?</AppLink>
    </div>
  );

  return (
    <AccForm
      onSubmit={handleSubmit(onSubmit)}
      serverErrorMessage={serverErrorMessage}
      linkSlot={resetPassBlock}
      submitButtonName="sign in"
    >
      <Input
        type="email"
        fieldName="email"
        labelText="email"
        icon={`${accIcons}#email`}
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      <Input
        type="password"
        fieldName="password"
        labelText="password"
        icon={`${accIcons}#password`}
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
    </AccForm>
  );
};
