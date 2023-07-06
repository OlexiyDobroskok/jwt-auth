import {
  type FieldValues,
  type FormState,
  type Path,
  type UseFormGetFieldState,
  type UseFormRegister,
} from "react-hook-form";
import clsx from "clsx";
import classes from "./Input.module.scss";

export const inputTheme = {
  row: "row",
  column: "column",
} as const;

export type InputTheme = (typeof inputTheme)[keyof typeof inputTheme];

interface InputProps<T extends FieldValues> {
  type: "text" | "password" | "email";
  fieldName: Path<T>;
  labelText: string;
  register: UseFormRegister<T>;
  getFieldState: UseFormGetFieldState<T>;
  formState: FormState<T>;
  className?: string;
  theme?: InputTheme;
}

export const Input = <T extends FieldValues>({
  type,
  labelText,
  fieldName,
  register,
  getFieldState,
  formState,
  className,
  theme = inputTheme.column,
}: InputProps<T>) => {
  const fieldState = getFieldState(fieldName, formState);
  const isError = fieldState.invalid;

  return (
    <label
      className={clsx(classes.label, className, {
        [classes.row]: theme === inputTheme.row,
      })}
    >
      {labelText}
      <input
        className={clsx(classes.input, { [classes.invalid]: isError })}
        type={type}
        {...register(fieldName)}
      />
      {isError && <p>{fieldState.error?.message}</p>}
    </label>
  );
};
