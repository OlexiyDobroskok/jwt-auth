import { useAppDispatch } from "shared/store";
import { logoutThunk } from "../model/logoutThunk";
import { redirect } from "react-router-dom";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logoutThunk());
    redirect("/");
  };
  return <button onClick={onLogout}>Logout</button>;
};
