import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeName, fetchUsers, postChanges } from "./usersSlice";

const UsersView = () => {
  const [name, setName] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSave = () => {
    if (selectedUserId) {
      dispatch(changeName({ id: selectedUserId, name }));
    }
  };

  const handleChanges = () => {
    dispatch(postChanges({ id: selectedUserId, name }));
  };

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>

      {users.isLoading && <p>Loading...</p>}
      {users.error && !users.isLoading && <p>Error: {users.error}</p>}
      <button onClick={handleChanges}>send</button>
      <ul>
        {!users.isLoading &&
          users.users.length > 0 &&
          users.users.map((user) => (
            <li key={user.id} onClick={() => setSelectedUserId(user.id)}>
              {user.title}
            </li>
          ))}
      </ul>

      {selectedUserId && <p>Selected User ID: {selectedUserId}</p>}
    </div>
  );
};

export default UsersView;
