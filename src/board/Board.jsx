import React from "react";

import "./board.css";
import Square from "../square/Square";

class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: Math.random() >= 0.5,
    isGameDone: false,
  };

  handleClick(i) {
    if (this.state.isGameDone) return;

    let isGameDone = false;

    const squares = this.state.squares.slice();
    let winnerLine = calculateWinner(this.state.squares);

    squares[i] = this.state.xIsNext ? "X" : "O";

    winnerLine = calculateWinner(squares);
    const winner = winnerLine && winnerLine.length ? squares[winnerLine[0]] : null;
    if (winner) {
      if (winner === "X") {
        this.props.addXVictory();
      } else {
        this.props.addOVictory();
      }
      isGameDone = true;
    } else if (isGameEnded(squares)) {
      this.props.addDraw();
      isGameDone = true;
    }

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      isGameDone: isGameDone,
    });
  }

  resetState() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: Math.random() >= 0.5,
      isGameDone: false,
		});
  }

  renderSquare(i, squareState) {
    return (
      <Square
        value={this.state.squares[i]}
        squareState={squareState}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderBoardRows(winnerLine) {
    return (
      <div className="board-rows">
        <div className="board-row">
          {this.renderSquare(0, getSquareState(0, winnerLine))}
          {this.renderSquare(1, getSquareState(1, winnerLine))}
          {this.renderSquare(2, getSquareState(2, winnerLine))}
        </div>
        <div className="board-row">
          {this.renderSquare(3, getSquareState(3, winnerLine))}
          {this.renderSquare(4, getSquareState(4, winnerLine))}
          {this.renderSquare(5, getSquareState(5, winnerLine))}
        </div>
        <div className="board-row">
          {this.renderSquare(6, getSquareState(6, winnerLine))}
          {this.renderSquare(7, getSquareState(7, winnerLine))}
          {this.renderSquare(8, getSquareState(8, winnerLine))}
        </div>
      </div>
    );
  }

  renderResetButton() {
    return (
      <button className="reset-button" onClick={() => this.resetState()}>
        Recommencer la partie
      </button>
    );
  }

  renderGameStatus(winnerLine) {
    const winner = winnerLine && winnerLine.length ? this.state.squares[winnerLine[0]] : null;

    let status = '';

    if (winner) {
      if (winner === "X") {
        status = `X a gagné`;
      } else {
        status = `O a gagné`;
      }
    } else if (isGameEnded(this.state.squares)) {
      status = `Match nul !`;
    } else {
      status = `Prochain joueur: ${this.state.xIsNext ? "X" : "O"}`;
    }
    return (
      <div className="status">{status}</div>
    );
  }

  render() {
    const winnerLine = calculateWinner(this.state.squares);
    
    return (
      <div className="board">
        {this.renderGameStatus(winnerLine)}
        {this.renderBoardRows(winnerLine)}
        {this.renderResetButton()}
      </div>
    );
  }
}

function isGameEnded(squares) {
  return !squares.some((elem) => elem === null);
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

function getSquareState(squareIndex, winnerLine) {
  if(!winnerLine) return;
  if (winnerLine.includes(squareIndex)) {
    return 'W';
  }
  return 'L';
}

export default Board;
