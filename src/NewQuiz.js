import React from "react";
import { Redirect } from "react-router-dom";
function NewQuiz({ isLoggedIn, setQuiz, setQuizID, setQuizBank }) {
  if (!isLoggedIn) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  function handleQuiz() {
    async function fetchQuiz() {
      const numberOfQuestions = 2;
      const fetchURL = `https://opentdb.com/api.php?type=multiple&encode=base64&amount=${numberOfQuestions}&token=`;
      const fetchRaw = await fetch(fetchURL);
      const quizObj = await fetchRaw.json();
      //response code 0 = success
      if (quizObj["response_code"] === 0) {
        const newQuiz = quizObj.results.map((q) => {
          const questionObj = {};
          //encode=base64 sends base64 back to ensure special characters are formatted properly, requires decoding via atob()
          questionObj.name = atob(q.question);
          questionObj.answers = [atob(q["correct_answer"]), atob(q["incorrect_answers"][0]), atob(q["incorrect_answers"][1]), atob(q["incorrect_answers"][2])];
          questionObj["correct_answer"] = questionObj.answers[0];
          //Randomizes the array to prevent the first answer from always being the correct answer
          questionObj.answers.sort(() => Math.random() - 0.5);
          return questionObj;
        });
        setQuiz(newQuiz);
        async function quizToDB(){
          const fetchURL = "http://localhost:3001/quizLib/"
          const fetchBody={
            "method": "POST",
            "headers": {"Content-Type":"application/json"},
            "body":  JSON.stringify(Object.assign({}, {"questions":newQuiz}))
          }
          const dbUpdate = await fetch(fetchURL, fetchBody)
          const dbUpdateObj = await dbUpdate.json()
          setQuizID(dbUpdateObj.id)
          setQuizBank(dbUpdateObj.id)
        }
        quizToDB()
      } else {
        console.log(quizObj["response_code"]);
        window.alert("Unable to obtain quiz, try again later");
      }
    }
    fetchQuiz();
  }
  return (
  <>
  < h1>
    Create a new Quiz!
  </h1>
  <div>
    <button onClick = {handleQuiz}>Generate Quiz</button>
  </div>
  </>
  );
  
}
export default NewQuiz;

/*
function handleQuiz() {
    async function fetchQuiz() {
      const fetchRaw = await fetch(fetchURL);
      const quizObj = await fetchRaw.json();
      //response code 0 = success
      if (quizObj["response_code"] === 0) {
        const newQuiz = quizObj.results.map((q) => {
          const questionObj = {};
          //encode=base64 sends base64 back to ensure special characters are formatted properly, requires decoding via atob()
          questionObj.name = atob(q.question);
          questionObj.answers = [atob(q["correct_answer"]), atob(q["incorrect_answers"][0]), atob(q["incorrect_answers"][1]), atob(q["incorrect_answers"][2])];
          questionObj["correct_answer"] = questionObj.answers[0];
          //Randomizes the array to prevent the first answer from always being the correct answer
          questionObj.answers.sort(() => Math.random() - 0.5);
          return questionObj;
        });
        console.log(newQuiz);
        setQuiz(newQuiz);
      } else {
        console.log(quizObj["response_code"]);
        window.alert("Unable to obtain quiz, try again later");
      }
    }
    fetchQuiz();
  }
*/