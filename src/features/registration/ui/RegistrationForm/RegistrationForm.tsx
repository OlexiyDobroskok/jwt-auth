import { Input } from "shared/ui";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  defaultValues,
  registrationFormSchema,
  type RegistrationFormSchema,
} from "../../model/registrationFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./RegistrationForm.module.scss";
import { useAppDispatch } from "shared/model";
import { type ApiException } from "shared/api";
import { useNavigate } from "react-router-dom";
import { registrationThunk } from "../../model/registrationThunk";
import { AppRoutes } from "shared/lib";

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
      const { id: userId } = await dispatch(
        registrationThunk({ userName, email, password })
      ).unwrap();
      if (userId) {
        navigate(AppRoutes.PROFILE);
      }
    } catch (error) {
      if ((error as ApiException).status === 409) {
        setError(
          "email",
          { type: "conflict", message: (error as ApiException).error },
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
