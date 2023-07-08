import { redirect } from "react-router-dom";

import { useAppDispatch } from "shared/store";

import { logoutThunk } from "../model/logoutThunk";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logoutThunk());
    redirect("/");
  };
  return <button onClick={onLogout}>Logout</button>;
};
