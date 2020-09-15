import React from "react";

import "./board.css";
import Square from "../square/Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: Math.random() >= 0.5,
      scores: {
        xVictory: 0,
        oVictory: 0,
        draw: 0,
      },
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      ...this.state,
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  resetState() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: Math.random() >= 0.5,
      scores: {
        xVictory: 0,
        oVictory: 0,
        draw: 0,
      },
    });
  }

  updateScore(newScores) {
    this.setState({
      ...this.state,
      scores: newScores,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;

    const newScores = this.state.scores;

    if (winner) {
      const newScores = this.state.scores;

      if (winner === "X") {
        newScores.xVictory += 1;
        this.updateScore(newScores);
      } else {
        newScores.oVictory += 1;
        this.updateScore(newScores);
      }
      status = `${winner} a gagné !`;
    } else if (isGameEnded(this.state.squares)) {
      newScores.draw += 1;
      this.updateScore(newScores);
      status = `Partie terminée ! Match nul.`;
    } else {
      status = `Prochain joueur: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div>
        <div className="score">
          <div className="counter-x-victory">
            Nombre de victoire de x: {this.state.scores.xVictory}
          </div>
          <div className="counter-o-victory">
            Nombre de victoire de o: {this.state.scores.oVictory}
          </div>
          <div className="draw-counter">
            Nombre de matches nul: {this.state.scores.draw}
          </div>
        </div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className="resetButton" onClick={() => this.resetState()}>
          Recommencer
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
      return squares[a];
    }
  }
  return null;
}

export default Board;
