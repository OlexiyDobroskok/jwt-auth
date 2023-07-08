import { RegistrationForm } from "features/registration";
import { LoginForm } from "features/authentication/login";

export const AccountPage = () => {
  return (
    <div>
      <RegistrationForm />
      <LoginForm />
    </div>
  );
};
