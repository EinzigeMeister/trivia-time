import React from "react";

function Header({ user }) {
  return <div>{user ? <div>Welcome {user}!</div> : <div>Please login to use app functionality</div>}</div>;
}

export default Header;
