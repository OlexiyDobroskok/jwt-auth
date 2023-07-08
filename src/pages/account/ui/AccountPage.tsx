import { LoginForm } from "features/authentication/login";
import { RegistrationForm } from "features/registration";

export const AccountPage = () => {
  return (
    <div>
      <RegistrationForm />
      <LoginForm />
    </div>
  );
};
