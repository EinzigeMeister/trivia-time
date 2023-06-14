import React from "react";
import { useHistory, Redirect } from "react-router-dom";
function NewQuiz({ isLoggedIn }) {
  if (!isLoggedIn) return <Redirect to="/login" />;
  return <h1>This is a new Quiz</h1>;
}
export default NewQuiz;
