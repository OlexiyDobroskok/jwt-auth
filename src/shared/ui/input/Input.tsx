import { useState } from "react";
import {
  type FieldValues,
  type FormState,
  type Path,
  type UseFormGetFieldState,
  type UseFormRegister,
} from "react-hook-form";
import clsx from "clsx";

import { accIcons, Icon } from "../icon";

import classes from "./Input.module.scss";

interface InputProps<T extends FieldValues> {
  type: "text" | "password" | "email";
  fieldName: Path<T>;
  labelText: string;
  register: UseFormRegister<T>;
  getFieldState: UseFormGetFieldState<T>;
  formState: FormState<T>;
  icon: string;
  className?: string;
}

export const Input = <T extends FieldValues>({
  type,
  labelText,
  fieldName,
  register,
  getFieldState,
  formState,
  icon,
  className,
}: InputProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const fieldState = getFieldState(fieldName, formState);
  const isError = fieldState.invalid;

  const visibilityIcon = isVisible
    ? `${accIcons}#eyeClosed`
    : `${accIcons}#eyeOpen`;

  const inputType =
    type === "password" && !isVisible
      ? "password"
      : type === "password" && isVisible
      ? "text"
      : type;

  return (
    <div
      className={clsx(
        classes.validator,
        { [classes.invalid]: isError },
        className
      )}
    >
      <div className={classes.formInput}>
        <Icon className={classes.icon} href={icon} />
        <label className={classes.label} htmlFor={fieldName}>
          {labelText}
          {isError && (
            <span className={classes.errorMessage}>
              {fieldState.error?.message}
            </span>
          )}
        </label>
        <div className={classes.inputContainer}>
          <input
            className={classes.input}
            type={inputType}
            id={fieldName}
            {...register(fieldName)}
          />
          {type === "password" && (
            <button
              className={classes.visibilityButton}
              type="button"
              onMouseDown={() => setIsVisible(true)}
              onMouseUp={() => setIsVisible(false)}
            >
              <Icon href={visibilityIcon} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
