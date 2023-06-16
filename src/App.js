import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";
import Home from "./Home";
import Login from "./Login";
import NewQuiz from "./NewQuiz";
import LoadQuiz from "./LoadQuiz";
import "./App.css";
import CurrentQuiz from "./CurrentQuiz";

function App() {
  const [user, setUser] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizID, setQuizID] = useState(null);
  const [quizBank, setQuizBank] = useState([])
  useEffect(()=>{
    loadLib()
    console.log("ran LoadQuiz useEffect")
  },[])
  async function loadLib(){
    const fetchLib= await fetch("http://localhost:3001/quizLib")
    const fetchObj = await fetchLib.json()
    if(quizBank!==fetchObj.length) setQuizBank(fetchObj.length)
  }
  return (
    <div className="App">
      <Header user={user} />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route path="/login">
          <Login  setUser={setUser} />
        </Route>
        <Route path="/newquiz">
          <NewQuiz user={user} setQuiz={setQuiz} setQuizID={setQuizID} setQuizBank={setQuizBank}/>
        </Route>
        <Route path="/loadquiz">
          <LoadQuiz user={user} setQuizID={setQuizID} setQuiz={setQuiz} quizBank={quizBank} />
        </Route>
        <Route path="/currentquiz">
          <CurrentQuiz  user={user} setUser={setUser} quiz={quiz} quizID={quizID}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
