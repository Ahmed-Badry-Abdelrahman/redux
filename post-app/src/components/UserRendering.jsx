/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";

const UserRendering = ({ userId }) => {
  const users = useSelector(selectAllUsers) || [];
  const user = users.find((user) => user.id === +userId);
  return <p>by: {user ? user.name : "unknown"}</p>;
};

export default UserRendering;
