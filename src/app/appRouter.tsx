import { createBrowserRouter } from "react-router-dom";

import { AuthGuard, GuestGuard } from "entities/session";
import { AccountPage } from "pages/account";
import { CreatePasswordPage } from "pages/create-password";
import { ProfilePage } from "pages/profile";
import { ResetPasswordPage } from "pages/reset-password";
import { appRoutes } from "shared/config";

import { rootLayout } from "./rootLayout";

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
