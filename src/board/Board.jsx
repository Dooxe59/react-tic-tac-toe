import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import "./board.scss";
import Square from "../square/Square";

const Board = ({ addXVictory, addOVictory, addDraw, resetGame }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(Math.random() >= 0.5);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerLine, setWinnerLine] = useState(null);

  useEffect(() => {
    // TODO: HS
    document.title = renderGameStatus()?.props?.children;
  });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return lines[i];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (isGameEnded || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    let isGameEndedNewValue = false;

    let winnerLine = calculateWinner(squares);

    const gameEnded = (squares) => {
      return !squares.some((elem) => elem === null);
    };

    const winner =
      winnerLine && winnerLine.length ? squares[winnerLine[0]] : null;
    if (winner) {
      if (winner === "X") {
        addXVictory();
      } else {
        addOVictory();
      }
      isGameEndedNewValue = true;
    } else if (gameEnded(squares)) {
      addDraw();
      isGameEndedNewValue = true;
    }

    setSquares(squares);
    setXIsNext(!xIsNext);
    setIsGameEnded(isGameEndedNewValue);
    setWinner(winner);
    setWinnerLine(winnerLine);
  };

  const resetState = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(Math.random() >= 0.5);
    setIsGameEnded(false);
    setWinner(null);
    setWinnerLine(null);
  };

  const getSquareState = (squareIndex) => {
    if (!winnerLine) return;
    if (winnerLine.includes(squareIndex)) {
      return "W";
    }
    return "L";
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        dataTestId={`square${i}`}
        squareState={getSquareState(i)}
        onClick={() => handleClick(i)}
      />
    );
  };

  const renderBoardRows = () => {
    return (
      <div className="board-rows">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  };

  const renderNextGameButton = () => {
    const buttonTitle = !isGameEnded
      ? "Ce bouton est désactivé car la partie n'est pas terminée"
      : "";

    return (
      <button
        className="next-game-button"
        disabled={!isGameEnded}
        title={buttonTitle}
        onClick={() => resetState()}
      >
        Partie suivante
      </button>
    );
  };

  const renderResetButton = () => {
    return (
      <button
        data-testid="reset-game-button"
        className="reset-button"
        onClick={() => restartGame()}
      >
        Recommencer
      </button>
    );
  };

  const restartGame = () => {
    resetGame();
    resetState();
  };

  const renderGameStatus = () => {
    let status = "";
    if (winner) {
      status = `${winner} a gagné`;
    } else if (isGameEnded) {
      status = `Match nul !`;
    } else {
      const nextPlayer = xIsNext ? "X" : "O";
      return (
        <div className="status">
          Prochain joueur:
          <span data-testid="next-player-value">{nextPlayer}</span>
        </div>
      );
    }
    return status;
  };

  return (
    <div className="board">
      {renderResetButton()}
      {renderGameStatus()}
      {renderBoardRows()}
      {renderNextGameButton()}
    </div>
  );
};

Board.propTypes = {
  addXVictory: PropTypes.func.isRequired,
  addOVictory: PropTypes.func.isRequired,
  addDraw: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default Board;
