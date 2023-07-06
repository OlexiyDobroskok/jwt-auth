import { RegistrationForm } from "features/registration";
import { LoginForm } from "features/authentication/login";
import { useAppSelector } from "shared/model";
import { selectIsAuthorized } from "entities/session";
import { selectUserInformation } from "entities/user";

export const AccountPage = () => {
  const isAuthorize = useAppSelector(selectIsAuthorized);
  const user = useAppSelector(selectUserInformation);
  return (
    <>
      {!isAuthorize && (
        <div>
          <RegistrationForm />
          <LoginForm />
        </div>
      )}
      {isAuthorize && <h1>Welcome back ${user?.userName}</h1>}
    </>
  );
};
