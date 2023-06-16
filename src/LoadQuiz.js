import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
function LoadQuiz({ isLoggedIn, setQuizID }) {
  const [quizBank, setQuizBank] = useState(null)
  const [formData, setFormData] = useState(1)
  useEffect(()=>{
    async function loadLib(){
      const fetchLib= await fetch("http://localhost:3001/quizLib")
      const fetchObj = await fetchLib.json()
      if(quizBank!==fetchObj.length) setQuizBank(fetchObj.length)
    }
    loadLib()
    console.log("ran LoadQuiz useEffect")
  },)

  if (!isLoggedIn) {
    window.alert("You must Login first, redirecting you to login");
    return <Redirect to="/login" />;
  }
  //TODO: generate form with a <p> informing max quiz ID, a textbox for entering quiz number {state}, and a submit button to set the quiz ID 
  function handleSubmit(e){
    e.preventDefault()
    if(isNaN(formData)){
      window.alert(`${formData} is not a number, please enter a valid number`)
    }
    else{
      
    }
  }
  function handleIDChange(e){
    setFormData(e.target.value)
  }
  return <>{quizBank
    ?(
    <>
    <h2>Enter the ID for the quiz you would like to know. Max: {quizBank}</h2>
    <form onSubmit={handleSubmit}>
      <label >Quiz ID: </label>
      <input type = "text" name="textID" value={formData} onChange={handleIDChange} />
      <input type = "submit"/>
    </form>
    </>)
    :(<div>No quizzes found</div>)}</>;
}
export default LoadQuiz;
