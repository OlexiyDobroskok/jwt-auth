import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { appRoutes } from "shared/config";
import { useAppSelector } from "shared/store";

import { selectIsAuthorized } from "../../model/sessionSlice";

export interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const isAuthorize = useAppSelector(selectIsAuthorized);

  if (!isAuthorize) {
    return <Navigate to={appRoutes.ACCOUNT} />;
  }

  return <>{children}</>;
};
