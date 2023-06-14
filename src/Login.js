import React, { useState, useEffect } from "react";
function Login({ setIsLoggedIn, setUser }) {
  const [userForm, setUserForm] = useState("");
  const [userList, setUserList] = useState([]);
  const fetchURL = "http://localhost:3001/users/";
  useEffect(() => {
    const fetchUserList = async () => {
      const userRaw = await fetch(fetchURL);
      const userJSON = await userRaw.json();
      setUserList(userJSON);
    };
    fetchUserList();
  }, []);
  function handleLogin(e) {
    e.preventDefault();
    let foundUser = false;
    let foundID = 0;
    userList.forEach((u) => {
      if (u.name === userForm) {
        foundUser = true;
        foundID = u.id;
      }
    });
    const newUserList = JSON.parse(JSON.stringify(userList));
    if (foundUser) {
      async function getUser() {
        const fetchResults = await fetch("" + fetchURL + foundID);
        const fetchJSON = await fetchResults.json();
        setUser(fetchJSON);
      }
      getUser();
    } else {
      setUserList(newUserList);
      const newUser = {
        name: userForm,
        scores: [],
      };
      const fetchBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };
      async function addNewUser() {
        const fetchResults = await fetch(fetchURL, fetchBody);
        const fetchJSON = await fetchResults.json();
        setUser(fetchJSON);
      }
      addNewUser();
    }

    setIsLoggedIn(true);
    setUserForm("");
  }
  function handleUserChange(e) {
    setUserForm(e.target.value);
  }
  return (
    <div>
      <h1>Enter the username you would like to use for this session: </h1>
      <form>
        <input type="text" placeholder="Enter Username" value={userForm} onChange={handleUserChange}></input>
        <input type="submit" onClick={handleLogin}></input>
      </form>
    </div>
  );
}

export default Login;
