import { createBrowserRouter } from "react-router-dom";
import { AppRoutes } from "shared/lib";
import { AccountPage } from "pages/account";
import { rootLayout } from "./rootLayout";
import { AuthGuard, GuestGuard } from "entities/session";
import { ProfilePage } from "pages/profile";
import { ResetPasswordPage } from "pages/reset-password";
import { CreatePasswordPage } from "pages/create-password";

export const appRouter = createBrowserRouter([
  {
    path: AppRoutes.ROOT,
    element: rootLayout,
    children: [
      {
        path: AppRoutes.ACCOUNT,
        element: (
          <AuthGuard>
            <AccountPage />
          </AuthGuard>
        ),
      },
      {
        path: AppRoutes.PROFILE,
        element: (
          <GuestGuard>
            <ProfilePage />
          </GuestGuard>
        ),
      },
      {
        path: AppRoutes.RESET_PASS,
        element: (
          <AuthGuard>
            <ResetPasswordPage />
          </AuthGuard>
        ),
      },
      {
        path: AppRoutes.CREATE_PASS,
        element: (
          <AuthGuard>
            <CreatePasswordPage />
          </AuthGuard>
        ),
      },
    ],
  },
]);
