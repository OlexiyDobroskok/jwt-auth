import { selectUser } from "entities/session";
import { LogoutButton } from "features/authentication/logout";
import { ChangePasswordForm } from "features/edit-password";
import { useAppSelector } from "shared/store";

import { datePresentation } from "../lib/datePresentation";

export const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  const registrationDate = user ? datePresentation(user.date) : "unknown";
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
