import { type SubmitHandler, useForm } from "react-hook-form";
import {
  defaultValues,
  loginFormSchema,
  type LoginFormSchema,
} from "../model/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "shared/ui";
import { useAppDispatch } from "shared/store";
import { loginThunk } from "../model/loginThunk";
import { useNavigate } from "react-router-dom";
import { type HttpError } from "shared/api";
import { appRoutes } from "shared/config";

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
  const serverErrorType = formState.errors.root?.serverError.type;
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        fieldName="email"
        labelText="email"
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      <Input
        type="password"
        fieldName="password"
        labelText="password"
        getFieldState={getFieldState}
        formState={formState}
        register={register}
      />
      {serverErrorType === "unknown" ||
        (serverErrorType === "unauthorized" && <p>{serverErrorMessage}</p>)}
      <button>submit</button>
    </form>
  );
};
