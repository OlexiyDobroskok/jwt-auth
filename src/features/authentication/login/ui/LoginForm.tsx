import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  defaultValues,
  loginFormSchema,
  type LoginFormSchema,
} from "../model/loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "shared/ui";
import { useAppDispatch } from "shared/model";
import { loginThunk } from "../model/loginThunk.ts";
import { useNavigate } from "react-router-dom";
import { ApiException } from "shared/api";
import { AppRoutes } from "shared/lib";

export const LoginForm = () => {
  const methods = useForm<LoginFormSchema>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(loginFormSchema),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const serverErrorType = methods.formState.errors.root?.serverError.type;
  const serverErrorMessage = methods.formState.errors.root?.serverError.message;
  const onSubmit: SubmitHandler<LoginFormSchema> = async (loginData) => {
    try {
      const { id } = await dispatch(loginThunk(loginData)).unwrap();
      if (id) {
        navigate(AppRoutes.PROFILE);
      }
    } catch (error) {
      if ((error as ApiException).status === 401) {
        methods.setError("root.serverError", {
          type: "unauthorized",
          message: (error as ApiException).error,
        });
      } else {
        methods.setError("root.serverError", {
          type: "unknown",
          message: "server error. try again later",
        });
      }

      methods.resetField("password");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input type="text" name="email" labelText="email" />
        <Input type="password" name="password" labelText="password" />
        {serverErrorType === "unknown" ||
          (serverErrorType === "unauthorized" && <p>{serverErrorMessage}</p>)}
        <button>submit</button>
      </form>
    </FormProvider>
  );
};
