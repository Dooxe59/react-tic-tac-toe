import React, { useState } from "react";

import "./game.scss";
import Board from "../board/Board";
import Score from "../score/Score";

const Game = () => {
  const [xVictory, setXVictory] = useState(0);
  const [oVictory, setOVictory] = useState(0);
  const [draw, setDraw] = useState(0);

  const resetGame = () => {
    setXVictory(0);
    setOVictory(0);
    setDraw(0);
  };

  return (
    <div className="game">
      <div className="game-name">React Tic-Tac-Toe</div>
      <div className="game-board">
        <Score xVictory={xVictory} oVictory={oVictory} draw={draw} />
        <Board
          addXVictory={() => setXVictory(xVictory + 1)}
          addOVictory={() => setOVictory(oVictory + 1)}
          addDraw={() => setDraw(draw + 1)}
          resetGame={() => resetGame()}
        />
      </div>
    </div>
  );
};

export default Game;
