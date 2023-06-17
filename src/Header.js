import React from "react";

function Header({ user }) {
  let name = "";
  if (user) user.name.length > 0 ? (name = user.name) : (name = "Anonymous");
  return <div>{user ? <div>Welcome {name}!</div> : <div>Please login to use app functionality</div>}</div>;
}

export default Header;
