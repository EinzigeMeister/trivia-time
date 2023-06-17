//TODO: When quizzes are indexed, PATCH userdata on test submission in handleGradeQuiz()
//TODO: Transfer quiz creation to NewQuiz component, have NewQuiz redirect to CurrentQuiz
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
function CurrentQuiz({ user, setUser, quizID, quiz }) {
  const [quizAnswers, setQuizAnswers] = useState([]);
  //Sets user's default answer to the first radio button
  useEffect(() => {
    if (!quiz) return;
    const initializeAnswers = [];
    quiz.forEach((q) => {
      initializeAnswers.push(q.answers[0]);
    });
    setQuizAnswers(initializeAnswers);
  }, [quiz]);

  if (!user) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  //Redirects if there isn't a quiz to load
  if (!quiz || quizID == null) {
    window.alert("No quiz selected, create or load a quiz first");
    return <Redirect to="/" />;
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
    //Update user state and DB with new quiz scores
    const scoreUpdate = [...user.scores];
    scoreUpdate[quizID] = [correct, quiz.length];
    const userUpdate = Object.assign({}, user, { scores: scoreUpdate });
    async function updateUserDB() {
      const fetchURL = `http://localhost:3001/users/${user.id}`;
      const fetchBody = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      };
      const userPatch = await fetch(fetchURL, fetchBody);
      const userPatchObj = await userPatch.json();
      setUser(userPatchObj);
    }
    updateUserDB();
    window.alert(`Quiz completed! You got ${correct} out of ${quiz.length} questions correct!`);
  }
  return (
    <>
      <form onSubmit={handleGradeQuiz}>
        {quiz.map((question, index) => {
          return (
            <div key={question.name}>
              <h3>
                {index + 1}: {question.name}
              </h3>
              <input type="radio" value={question.answers[0]} name={index} checked={question.answers[0] === quizAnswers[index]} onChange={handleAnswerChange} />
              {question.answers[0]}
              <input type="radio" value={question.answers[1]} name={index} checked={question.answers[1] === quizAnswers[index]} onChange={handleAnswerChange} />
              {question.answers[1]}
              <input type="radio" value={question.answers[2]} name={index} checked={question.answers[2] === quizAnswers[index]} onChange={handleAnswerChange} />
              {question.answers[2]}
              <input type="radio" value={question.answers[3]} name={index} checked={question.answers[3] === quizAnswers[index]} onChange={handleAnswerChange} />
              {question.answers[3]}
            </div>
          );
        })}
        <input type="submit" />
      </form>
    </>
  );
}
export default CurrentQuiz;
