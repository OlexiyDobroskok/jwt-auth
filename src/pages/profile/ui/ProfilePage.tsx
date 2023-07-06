import { useAppSelector } from "shared/model";
import { selectUserInformation } from "entities/user";
import { datePresentation } from "../lib/datePresentation.ts";
import { LogoutButton } from "features/authentication/logout";
import { ChangePasswordForm } from "features/change-password";

export const ProfilePage = () => {
  const user = useAppSelector(selectUserInformation);
  const registrationDate = user
    ? datePresentation(user.registrationDate)
    : "unknown";
  return (
    <article>
      <h2>Welcome back, {user?.userName}</h2>
      <div>
        <p>username: {user?.userName}</p>
        <p>email: {user?.email}</p>
        <p>registered: {registrationDate}</p>
      </div>
      <ChangePasswordForm />
      <LogoutButton />
    </article>
  );
};
