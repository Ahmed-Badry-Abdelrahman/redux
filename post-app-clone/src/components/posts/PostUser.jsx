/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import {
  selectAllUsers,
  selectUsersErrors,
  selectUsersStatus,
} from "../../features/users/usersSlice";
import { useMemo } from "react";

function PostUser({ post }) {
  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(selectUsersStatus); // Corrected typo
  const usersError = useSelector(selectUsersErrors);

  const user = useMemo(() => {
    // console.log("from post user:", post.userId);
    return users.find((user) => user.id === Number(post.userId));
  }, [post.userId, users]);

  // console.log("from user", user);
  const displayName = user?.name || "Unknown Author";
  return (
    <div className="Author">
      {usersStatus ? (
        <p>loading...</p>
      ) : usersError ? (
        <p>{`sorry can't get Author name `}</p>
      ) : (
        displayName
      )}
    </div>
  );
}

export default PostUser;
