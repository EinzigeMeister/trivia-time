import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function NewQuiz({ user, setQuiz, setQuizID, loadLib, categoryList }) {
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    numberOfQuestions: 1,
    category: categoryList[0],
  });
  let history = useHistory();
  //initializes setDisabled property on button
  useEffect(() => {
    setDisabled(false);
  }, []);
  if (!user) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  //reformats API information to use in db
  function generateQuiz(quizObj) {
    return quizObj.results.map((q) => {
      const questionObj = {};
      //encode=base64 sends base64 back to ensure special characters are formatted properly, requires decoding via atob()
      questionObj.name = atob(q.question).replace("&amp;", /&/g).replace("&gt;", />/g).replace("&lt;", /</g).replace("&quot;", /"/g);
      questionObj.answers = [
        atob(q["correct_answer"]).replace("&amp;", /&/g).replace("&gt;", />/g).replace("&lt;", /</g).replace("&quot;", /"/g),
        atob(q["incorrect_answers"][0]).replace("&amp;", /&/g).replace("&gt;", />/g).replace("&lt;", /</g).replace("&quot;", /"/g),
        atob(q["incorrect_answers"][1]).replace("&amp;", /&/g).replace("&gt;", />/g).replace("&lt;", /</g).replace("&quot;", /"/g),
        atob(q["incorrect_answers"][2]).replace("&amp;", /&/g).replace("&gt;", />/g).replace("&lt;", /</g).replace("&quot;", /"/g),
      ];
      questionObj["correct_answer"] = questionObj.answers[0];
      //Randomizes the array to prevent the first answer from always being the correct answer
      questionObj.answers.sort(() => Math.random() - 0.5);
      return questionObj;
    });
  }
  //update new quiz in json-server
  async function quizToDB(newQuiz) {
    const fetchURL = "http://localhost:3001/quizLib/";
    const fetchBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({}, { questions: newQuiz })),
    };
    const dbUpdate = await fetch(fetchURL, fetchBody);
    const dbUpdateObj = await dbUpdate.json();
    setQuizID(dbUpdateObj.id);
  }
  //Redirects to path after a short delay
  function pushToPath(path) {
    setTimeout(() => {
      history.push(path);
    }, 300);
  }
  //updates the quiz library and reactivates the submit button
  function buttonTimeout() {
    loadLib();
    setDisabled(false);
  }
  async function fetchQuiz() {
    //if All is selected, don't fetch by category, otherwise add a category filter
    const categoryString = formData.category.id === 8 ? "" : `&&category=${formData.category.id}`;
    const fetchURL = `https://opentdb.com/api.php?type=multiple&encode=base64${categoryString}&&amount=${formData.numberOfQuestions}&token=`;
    const fetchRaw = await fetch(fetchURL);
    const quizObj = await fetchRaw.json();
    //response code 0 = success
    if (quizObj["response_code"] === 0) {
      const newQuiz = generateQuiz(quizObj);
      setQuiz(newQuiz);
      quizToDB(newQuiz);
      pushToPath("/currentquiz");
    } else {
      console.log(quizObj["response_code"]);
      window.alert("Unable to obtain quiz, try again later");
    }
  }
  //Form submission
  function handleQuiz(e) {
    e.preventDefault();
    setDisabled(true);
    fetchQuiz();
    //reactivates button AND updates quiz library
    setTimeout(buttonTimeout, 400);
  }

  //Form updates
  function handleCategoryChange(e) {
    const categoryObj = {
      id: e.target.value,
      name: e.target[e.target.value - 8].label,
    };
    setFormData(Object.assign({}, formData, { category: categoryObj }));
  }
  function handleNumQuestionsChange(e) {
    setFormData(Object.assign({}, formData, { numberOfQuestions: e.target.value }));
  }

  return (
    <>
      <h1>Create a new Quiz!</h1>
      <form onSubmit={handleQuiz}>
        <div>
          <label>Category: </label>
          <select onChange={handleCategoryChange} value={formData.category.id}>
            {categoryList.map(({ id, name }) => {
              return <option key={id} value={id} label={name} />;
            })}
          </select>
        </div>
        <div>
          <label>Number of questions: </label>
          <select onChange={handleNumQuestionsChange} value={formData.numberOfQuestions}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n} label={n} />
            ))}
          </select>
        </div>
        <input type="submit" disabled={disabled} value="Generate Quiz" />
      </form>
    </>
  );
}

export default NewQuiz;
