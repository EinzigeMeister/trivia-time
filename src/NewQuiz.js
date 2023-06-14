import React from "react";
import { useHistory, Redirect } from "react-router-dom";
function NewQuiz({ isLoggedIn }) {
  if (!isLoggedIn) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  return <h1>This is a new Quiz</h1>;
}
export default NewQuiz;
