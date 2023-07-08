import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "shared/store";

import { selectIsAuthorized } from "../../model/sessionSlice";

export interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
