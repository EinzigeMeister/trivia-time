import React from "react";
import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/newquiz">New Quiz</NavLink>
      <NavLink to="/loadquiz">Load Quiz</NavLink>
      <NavLink to="/currentquiz">Current Quiz</NavLink>
    </nav>
  );
}

export default NavBar;
