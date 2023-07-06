import { useAppDispatch } from "shared/model";
import { logoutThunk } from "../model/logoutThunk.ts";
import { redirect } from "react-router-dom";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logoutThunk());
    redirect("/");
  };
  return <button onClick={onLogout}>Logout</button>;
};
