import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import classes from "./Input.module.scss";

export const enum InputTheme {
  row = "row",
  column = "column",
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelText: string;
  theme?: InputTheme;
}

export const Input = ({
  labelText,
  name,
  className,
  theme = InputTheme.column,
  ...props
}: InputProps) => {
  const { register, getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(name, formState);
  const isError = fieldState.invalid;

  return (
    <label
      className={clsx(classes.label, className, {
        [classes.row]: theme === InputTheme.row,
      })}
    >
      {labelText}
      <input
        className={clsx(classes.input, { [classes.invalid]: isError })}
        {...props}
        {...register(name)}
      />
      {isError && <p>{fieldState.error?.message}</p>}
    </label>
  );
};
