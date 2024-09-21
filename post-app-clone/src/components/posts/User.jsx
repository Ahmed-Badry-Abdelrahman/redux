/* eslint-disable react/prop-types */

function User({ user }) {
  return <span>{user && user.name}</span>;
}

export default User;
