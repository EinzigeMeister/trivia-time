import React, { useState } from "react";
function Login({ setIsLoggedIn, setUser }) {
  const [userForm, setUserForm] = useState("");
  function handleLogin(e) {
    e.preventDefault();
    setUser(userForm);
    setIsLoggedIn(true);
    setUserForm("");
  }
  function handleUserChange(e) {
    setUserForm(e.target.value);
  }
  return (
    <div>
      <h1>Enter the username you would like to use for this session: </h1>
      <form>
        <input type="text" placeholder="Enter Username" value={userForm} onChange={handleUserChange}></input>
        <input type="submit" onClick={handleLogin}></input>
      </form>
    </div>
  );
}

export default Login;
