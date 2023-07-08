import { type ReactNode } from "react";
import { useAppSelector } from "shared/store";
import { selectIsAuthorized } from "../../model/sessionSlice";
import { Navigate } from "react-router-dom";

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
