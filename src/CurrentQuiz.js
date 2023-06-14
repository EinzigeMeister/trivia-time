//TODO: When quizzes are indexed, PATCH userdata on test submission in handleGradeQuiz()
//TODO: Transfer quiz creation to NewQuiz component, have NewQuiz redirect to CurrentQuiz
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
function CurrentQuiz({ isLoggedIn, user, setUser }) {
  const [quiz, setQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  useEffect(() => {
    if (!quiz) return;
    const initializeAnswers = [];
    quiz.forEach((q) => {
      initializeAnswers.push(q.answers[0]);
    });
    setQuizAnswers(initializeAnswers);
  }, [quiz]);
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
  function handleAnswerChange(e) {
    const answerUpdate = [...quizAnswers];
    answerUpdate[e.target.name] = e.target.value;
    setQuizAnswers(answerUpdate);
  }
  function handleGradeQuiz(e) {
    e.preventDefault();
    let correct = 0;
    quiz.forEach((q, index) => {
      if (q["correct_answer"] === quizAnswers[index]) correct++;
    });
    const scoreUpdate = [...user.scores];
    scoreUpdate[9] = [correct, quiz.length];
    const userUpdate = Object.assign({}, user, { scores: scoreUpdate });
    setUser(userUpdate);
    window.alert(`Quiz completed! You got ${correct} out of ${quiz.length} questions correct!`);
  }
  return (
    <>
      {quiz ? (
        <form onSubmit={handleGradeQuiz}>
          {quiz.map((question, index) => {
            return (
              <div key={question.name}>
                <h3>
                  {index + 1}: {question.name}
                </h3>
                <input
                  type="radio"
                  value={question.answers[0]}
                  name={index}
                  checked={question.answers[0] === quizAnswers[index]}
                  onChange={handleAnswerChange}
                />
                {question.answers[0]}
                <input
                  type="radio"
                  value={question.answers[1]}
                  name={index}
                  checked={question.answers[1] === quizAnswers[index]}
                  onChange={handleAnswerChange}
                />
                {question.answers[1]}
                <input
                  type="radio"
                  value={question.answers[2]}
                  name={index}
                  checked={question.answers[2] === quizAnswers[index]}
                  onChange={handleAnswerChange}
                />
                {question.answers[2]}
                <input
                  type="radio"
                  value={question.answers[3]}
                  name={index}
                  checked={question.answers[3] === quizAnswers[index]}
                  onChange={handleAnswerChange}
                />
                {question.answers[3]}
              </div>
            );
          })}
          <input type="submit" />
        </form>
      ) : (
        <button onClick={handleQuiz}>Display Quiz</button>
      )}
    </>
  );
}
export default CurrentQuiz;
