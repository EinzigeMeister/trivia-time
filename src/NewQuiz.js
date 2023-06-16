import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
function NewQuiz({ user, setQuiz, setQuizID, loadLib, categoryList }) {
  const [disabled, setDisabled] = useState(false)
  const [formData, setFormData] = useState({
    numberOfQuestions: 1,
    category: categoryList[0]
  })
  //initializes setDisabled property on button
  useEffect(() => {
    setDisabled(false)
  }, [])
  if (!user) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  //update new quiz in json-server
  async function quizToDB(newQuiz) {
    const fetchURL = "http://localhost:3001/quizLib/"
    const fetchBody = {
      "method": "POST",
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify(Object.assign({}, { "questions": newQuiz }))
    }
    const dbUpdate = await fetch(fetchURL, fetchBody)
    const dbUpdateObj = await dbUpdate.json()
    setQuizID(dbUpdateObj.id)
  }
  function handleQuiz() {
    setDisabled(true)
    async function fetchQuiz() {
      //if All is selected, don't fetch by category, otherwise add a category filter
      const categoryString = formData.category.id === 8 ? "" : `&&category=${formData.category.id}`
      const fetchURL = `https://opentdb.com/api.php?type=multiple&encode=base64${categoryString}&&amount=${formData.numberOfQuestions}&token=`;
      const fetchRaw = await fetch(fetchURL);
      const quizObj = await fetchRaw.json();
      console.log(quizObj)
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
        quizToDB(newQuiz)
      } else {
        console.log(quizObj["response_code"]);
        window.alert("Unable to obtain quiz, try again later");
      }
    }
    fetchQuiz();
    //update library, setTimeout due to json-server restarting causing fetch errors
    setTimeout(buttonTimeout, 1000)
    function buttonTimeout() {
      loadLib()
      setDisabled(false)
    }

  }
  function handleChange(e) {
    setFormData(Object.assign({}, { id: e.target.value, category: e.target[e.target.value - 8].label }))
  }
  return (
    <>
      < h1>
        Create a new Quiz!
      </h1>
      <form onSubmit={handleQuiz} >
        <p>Category</p>
        <select onChange={handleChange} value={formData.id}>
          {categoryList.map(({ id, name }) => {
            return <option key={id} value={id} label={name} />
          })}

        </select>
        <input type="submit" disabled={disabled} value="Generate Quiz" />
      </form>
    </>
  );

}

export default NewQuiz;
