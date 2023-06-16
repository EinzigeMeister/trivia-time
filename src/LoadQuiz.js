import React, {useState} from "react";
import { Redirect } from "react-router-dom";
function LoadQuiz({ user, setQuizID, setQuiz , quizBank}) {
  const [formData, setFormData] = useState(1)

  if (!user) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  function handleSubmit(e){
    e.preventDefault()
    if(isNaN(formData)){
      window.alert(`${formData} is not a number, please enter a valid number`)
    }
    else{
      if(formData>quizBank.length || formData<=0 ||!Number.isInteger(formData)){
        window.alert(`Enter a whole number between 1 and ${quizBank.length}`)
      }
      else{
        //fetch & update quiz
        async function updateQuiz(){
          const loadQuizRaw = await fetch(`http://localhost:3001/quizLib/${formData}`)
          const loadQuizObj = await loadQuizRaw.json()
          setQuiz(loadQuizObj.questions)
        }
        updateQuiz()
        setQuizID(formData)
      }
    }
  }
  return <>{quizBank
    ?(
    <>
    <h2>Enter the ID for the quiz you would like to know. Max ID: {quizBank.length}</h2>
    <form onSubmit={handleSubmit}>
      <label >Quiz ID: </label>
      <input type = "text" name="textID" value={formData} onChange={(e)=>setFormData(e.target.value)} />
      <input type = "submit"/>
    </form>
    </>)
    :(<div>No quizzes found</div>)}</>;
}
export default LoadQuiz;
