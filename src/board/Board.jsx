import React from "react";

import "./board.css";
import Square from "../square/Square";

class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: Math.random() >= 0.5,
  };

  handleClick(i) {
    const squares = this.state.squares.slice();
    const winnerLine = calculateWinner(this.state.squares);
    if (winnerLine || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  resetState() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: Math.random() >= 0.5,
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

  getSquareState(squareIndex, winnerLine) {
    if(!winnerLine) return;
    if (winnerLine.includes(squareIndex)) {
      return 'W';
    }
    return 'L';
  }

  render() {
    const winnerLine = calculateWinner(this.state.squares);
    const winner = winnerLine && winnerLine.length ? this.state.squares[winnerLine[0]] : null;
    let status = '';

    if (winner) {
      if (winner === "X") {
        this.props.addXVictory();
        status = `X a gagné`;
      } else {
        this.props.addOVictory();
        status = `O a gagné`;
      }
    } else if (isGameEnded(this.state.squares)) {
      this.props.addDraw();
      status = `Match nul !`;

    } else {
      status = `Prochain joueur: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-rows">
          <div className="board-row">
            {this.renderSquare(0, this.getSquareState(0, winnerLine))}
            {this.renderSquare(1, this.getSquareState(1, winnerLine))}
            {this.renderSquare(2, this.getSquareState(2, winnerLine))}
          </div>
          <div className="board-row">
            {this.renderSquare(3, this.getSquareState(3, winnerLine))}
            {this.renderSquare(4, this.getSquareState(4, winnerLine))}
            {this.renderSquare(5, this.getSquareState(5, winnerLine))}
          </div>
          <div className="board-row">
            {this.renderSquare(6, this.getSquareState(6, winnerLine))}
            {this.renderSquare(7, this.getSquareState(7, winnerLine))}
            {this.renderSquare(8, this.getSquareState(8, winnerLine))}
          </div>
        </div>
        <button className="reset-button" onClick={() => this.resetState()}>
          Recommencer la partie
        </button>
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

export default Board;
