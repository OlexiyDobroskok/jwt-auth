import { useAppDispatch } from "shared/model";
import { fetchUsersThunk } from "../../model/fetchUsersThunk";

export const UsersBtn = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(fetchUsersThunk());
  };
  return <button onClick={onClick}>Fetch users</button>;
};
