import React, { useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [quizID, setQuizID] = useState(null);
  return (
    <div className="App">
      <Header user={user} />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
        </Route>
        <Route path="/newquiz">
          <NewQuiz isLoggedIn={isLoggedIn} setQuiz={setQuiz} setQuizID={setQuizID}/>
        </Route>
        <Route path="/loadquiz">
          <LoadQuiz isLoggedIn={isLoggedIn} setQuizID={setQuizID} setQuiz={setQuiz} />
        </Route>
        <Route path="/currentquiz">
          <CurrentQuiz isLoggedIn={isLoggedIn} user={user} setUser={setUser} quiz={quiz} quizID={quizID}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
