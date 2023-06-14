import React from "react";
import { Redirect } from "react-router-dom";
function LoadQuiz({ isLoggedIn }) {
  if (!isLoggedIn) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  return <h1>This is the Load Quiz page</h1>;
}
export default LoadQuiz;
