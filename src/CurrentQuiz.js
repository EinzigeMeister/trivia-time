import React, { useState } from "react";
import { Redirect } from "react-router-dom";
function CurrentQuiz({ isLoggedIn }) {
  const [quiz, setQuiz] = useState([]);
  if (!isLoggedIn) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  //TO-DO generate a form based off test data

  const numberOfQuestions = 2;
  const fetchURL = `https://opentdb.com/api.php?type=multiple&encode=base64&amount=${numberOfQuestions}&token=`;

  function handleQuiz() {
    async function fetchQuiz() {
      const fetchRaw = await fetch(fetchURL);
      const quizObj = await fetchRaw.json();
      console.log(quizObj);
      if (quizObj["response_code"] === 0) {
        const newQuiz = quizObj.results.map((q) => {
          const questionObj = {};
          questionObj.name = atob(q.question);
          questionObj.answers = [atob(q["correct_answer"]), atob(q["incorrect_answers"][0]), atob(q["incorrect_answers"][1]), atob(q["incorrect_answers"][2])];
          return questionObj;
        });
        console.log(newQuiz);
      } else {
        console.log(quizObj["response_code"]);
        window.alert("Unable to obtain quiz, try again later");
      }
    }
    fetchQuiz();
  }
  return (
    <div>
      <button onClick={handleQuiz}>Add Quiz</button>
      <h1>This is the Current Quiz page</h1>
    </div>
  );
}
export default CurrentQuiz;
