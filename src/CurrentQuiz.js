import React from "react";
import { Redirect } from "react-router-dom";
function CurrentQuiz({ isLoggedIn }) {
  if (!isLoggedIn) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  return <h1>This is the Current Quiz page</h1>;
}
export default CurrentQuiz;
