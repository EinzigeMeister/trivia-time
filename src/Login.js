import React, { useEffect } from "react";
function Login({ setIsLoggedIn }) {
  useEffect(() => setIsLoggedIn(true), []);
  return <h1>You are now logged in!</h1>;
}

export default Login;
