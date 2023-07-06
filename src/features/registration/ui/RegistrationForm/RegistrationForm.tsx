import { Input } from "shared/ui";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  defaultValues,
  registrationFormSchema,
  RegistrationFormSchema,
} from "../../model/registrationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./RegistrationForm.module.scss";
import { useAppDispatch } from "shared/model";
import { type ApiException } from "shared/api";
import { useNavigate } from "react-router-dom";
import { registrationThunk } from "../../model/registrationThunk";
import { AppRoutes } from "shared/lib";

export const RegistrationForm = () => {
  const methods = useForm<RegistrationFormSchema>({
    defaultValues,
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const serverErrorType = methods.formState.errors.root?.serverError.type;
  const serverErrorMessage = methods.formState.errors.root?.serverError.message;

  const onSubmit: SubmitHandler<RegistrationFormSchema> = async ({
    userName,
    email,
    password,
  }) => {
    try {
      const { id: userId } = await dispatch(
        registrationThunk({ userName, email, password })
      ).unwrap();
      if (userId) {
        navigate(AppRoutes.PROFILE);
      }
    } catch (error) {
      if ((error as ApiException).status === 409) {
        methods.setError(
          "email",
          { type: "conflict", message: (error as ApiException).error },
          { shouldFocus: true }
        );
      } else {
        methods.setError("root.serverError", {
          type: "unknown",
          message: "server error. try again later",
        });
      }
      methods.resetField("password");
      methods.resetField("confirmPassword");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={classes.registrationForm}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Input type="text" name="userName" labelText="username" />
        <Input type="text" name="email" labelText="email" />
        <Input type="password" name="password" labelText="password" />
        <Input
          type="password"
          name="confirmPassword"
          labelText="confirm password"
        />
        {serverErrorType === "unknown" ||
          (serverErrorType === "conflict" && <p>{serverErrorMessage}</p>)}
        <button>submit</button>
      </form>
    </FormProvider>
  );
};
