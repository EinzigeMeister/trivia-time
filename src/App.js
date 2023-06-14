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
  return (
    <div className="App">
      <NavBar />
      {/* <Header /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/newquiz">
          <NewQuiz isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/loadquiz">
          <LoadQuiz isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/currentquiz">
          <CurrentQuiz isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
