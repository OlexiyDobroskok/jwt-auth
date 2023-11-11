import { useState } from "react";
import clsx from "clsx";

import { LoginForm } from "features/authentication/login";
import { RegistrationForm } from "features/registration";

import classes from "./AccountPage.module.scss";

export const AccountPage = () => {
  const [isRegistered, setIsRegistered] = useState(true);

  const changeForm = () => {
    setIsRegistered((prevState) => !prevState);
  };

  return (
    <div className={classes.page}>
      <article
        className={clsx(classes.accForm, {
          [classes.visuallyHidden]: isRegistered,
        })}
      >
        <h2 className={classes.formTitle}>sign up</h2>
        <div className={classes.form}>
          <RegistrationForm />
        </div>
      </article>
      <div className={classes.backdrop}>
        <button className={classes.changeButton} onClick={changeForm}>
          {!isRegistered ? "sign in" : "sign up"}
        </button>
      </div>
      <article
        className={clsx(classes.accForm, {
          [classes.visuallyHidden]: !isRegistered,
        })}
      >
        <h2 className={classes.formTitle}>sign in</h2>
        <div className={classes.form}>
          <LoginForm />
        </div>
      </article>
    </div>
  );
};
