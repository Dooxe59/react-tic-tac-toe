import React from "react";

import "./board.scss";
import Square from "../square/Square";

class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: Math.random() >= 0.5,
    isGameEnded: false,
    winner: null,
    winnerLine: null,
  };

  isGameEnded(squares) {
    return !squares.some((elem) => elem === null);
  }

  calculateWinner(squares) {
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

  handleClick(i) {
    if (this.state.isGameEnded) return;

    let isGameEnded = false;

    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? "X" : "O";

    let winnerLine = this.calculateWinner(squares);

    const winner = winnerLine && winnerLine.length ? squares[winnerLine[0]] : null;
    if (winner) {
      if (winner === "X") {
        this.props.addXVictory();
      } else {
        this.props.addOVictory();
      }
      isGameEnded = true;
    } else if (this.isGameEnded(squares)) {
      this.props.addDraw();
      isGameEnded = true;
    }

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      isGameEnded: isGameEnded,
      winner: winner,
      winnerLine: winnerLine,
    });
  }

  resetState() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: Math.random() >= 0.5,
      isGameEnded: false,
      winner: null,
      winnerLine: null,
		});
  }

  getSquareState(squareIndex) {
    const winnerLine = this.state.winnerLine;

    if(!winnerLine) return;
    if (winnerLine.includes(squareIndex)) {
      return 'W';
    }
    return 'L';
  }

  renderSquare(i, squareState) {
    return (
      <Square
        value={this.state.squares[i]}
        squareState={this.getSquareState(i)}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderBoardRows() {
    return (
      <div className="board-rows">
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
      </div>
    );
  }

  renderNextGameButton() {
    const buttonTitle = !this.state.isGameEnded
      ? 'Ce bouton est désactivé car la partie n\'est pas terminée' : '';

    return (
      <button 
        className="next-game-button" 
        disabled={!this.state.isGameEnded} 
        title={buttonTitle}
        onClick={() => this.resetState()}
      >
        Partie suivante
      </button>
    );
  }

  renderResetButton() {
    return (
      <button 
        className="reset-button" 
        onClick={() => this.resetGame()}
      >
        Recommencer
      </button>
    );
  }

  resetGame() {
    this.props.resetGame();
    this.resetState();
  }

  renderGameStatus() {
    const winner = this.state.winner;
    const isGameEnded = this.state.isGameEnded;

    let status = '';
    if (winner) {
      status = `${winner} a gagné`;
    } else if (isGameEnded) {
      status = `Match nul !`;
    } else {
      const nextPlayer = this.state.xIsNext ? "X" : "O";
      status = `Prochain joueur: ${nextPlayer}`;
    }
    return (
      <div className="status">{status}</div>
    );
  }

  render() {
    return (
      <div className="board">
        {this.renderResetButton()}
        {this.renderGameStatus()}
        {this.renderBoardRows()}
        {this.renderNextGameButton()}
      </div>
    );
  }
}

export default Board;
