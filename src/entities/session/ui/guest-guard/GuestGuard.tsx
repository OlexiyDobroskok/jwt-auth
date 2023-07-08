import { ReactNode } from "react";
import { useAppSelector } from "shared/store";
import { selectIsAuthorized } from "../../model/sessionSlice";
import { Navigate } from "react-router-dom";
import { appRoutes } from "shared/config";

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
