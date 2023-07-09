import { useState } from "react";
import {
  type FieldValues,
  type FormState,
  type Path,
  type UseFormGetFieldState,
  type UseFormRegister,
} from "react-hook-form";
import clsx from "clsx";

import accIcons from "shared/assets/accIcons.svg";

import classes from "./Input.module.scss";

interface InputProps<T extends FieldValues> {
  type: "text" | "password" | "email";
  fieldName: Path<T>;
  labelText: string;
  register: UseFormRegister<T>;
  getFieldState: UseFormGetFieldState<T>;
  formState: FormState<T>;
  icon?: string;
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
    <div className={clsx(classes.formInput, className)}>
      <svg className={classes.icon}>
        <use href={icon} />
      </svg>
      <label className={classes.label} htmlFor={fieldName}>
        <span className={classes.labelText}>{labelText}</span>
        {isError && (
          <span className={classes.errorMessage}>
            {fieldState.error?.message}
          </span>
        )}
      </label>
      <div>
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
            <svg>
              <use href={visibilityIcon} />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
