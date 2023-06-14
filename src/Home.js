import React from "react";

function Home({ user }) {
  let completedQuizzes = 0;
  const quizScoreTotals = [0, 0];
  if (user) {
    user.scores.forEach((quiz) => {
      if (typeof quiz == "undefined") return 0;
      quizScoreTotals[0] += quiz[0];
      quizScoreTotals[1] += quiz[1];
      completedQuizzes++;
    });
  }
  return (
    <div>
      {user ? (
        <div>
          <h1>User stats:</h1>
          <h2>Completed Quizzes: {completedQuizzes}</h2>
          <h2>
            You got {quizScoreTotals[0]} out of {quizScoreTotals[1]} questions correct!
          </h2>
        </div>
      ) : (
        <div>
          <h1>Login to see your stats!</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
