import { createBrowserRouter } from "react-router-dom";
import { appRoutes } from "shared/config";
import { AccountPage } from "pages/account";
import { rootLayout } from "./rootLayout";
import { AuthGuard, GuestGuard } from "entities/session";
import { ProfilePage } from "pages/profile";
import { ResetPasswordPage } from "pages/reset-password";
import { CreatePasswordPage } from "pages/create-password";

export const appRouter = createBrowserRouter([
  {
    path: appRoutes.ROOT,
    element: rootLayout,
    children: [
      {
        path: appRoutes.ACCOUNT,
        element: (
          <AuthGuard>
            <AccountPage />
          </AuthGuard>
        ),
      },
      {
        path: appRoutes.PROFILE,
        element: (
          <GuestGuard>
            <ProfilePage />
          </GuestGuard>
        ),
      },
      {
        path: appRoutes.RESET_PASS,
        element: (
          <AuthGuard>
            <ResetPasswordPage />
          </AuthGuard>
        ),
      },
      {
        path: appRoutes.CREATE_PASS,
        element: (
          <AuthGuard>
            <CreatePasswordPage />
          </AuthGuard>
        ),
      },
    ],
  },
]);
