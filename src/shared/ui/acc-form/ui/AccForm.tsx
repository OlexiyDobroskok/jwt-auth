import { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import classes from "./AccForm.module.scss";

export interface AccFormProps {
  children: ReactNode;
  linkSlot?: ReactNode;
  submitButtonName?: string;
  className?: string;
  onSubmit?: () => void;
  successfulMessage?: string;
  serverErrorMessage?: string;
}

export const AccForm = ({
  linkSlot,
  children,
  className,
  onSubmit,
  submitButtonName = "submit",
  successfulMessage,
  serverErrorMessage,
}: AccFormProps) => {
  return (
    <form className={clsx(classes.form, className)} onSubmit={onSubmit}>
      <div className={classes.formFields}>
        {children}
        {serverErrorMessage && (
          <span className={classes.errorMessage}>{serverErrorMessage}</span>
        )}
        {successfulMessage && (
          <span className={classes.successfulMessage}>{successfulMessage}</span>
        )}
      </div>
      <div className={classes.submitField}>
        {linkSlot}
        <button className={classes.submitButton}>{submitButtonName}</button>
      </div>
    </form>
  );
};
