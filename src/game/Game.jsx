import React from 'react';

import './game.css';
import Board from '../board/Board';
import Score from '../score/Score';

class Game extends React.Component {
  state = {
    xVictory: 0,
    oVictory: 0,
    draw: 0,
  };

	addXVictory() {
    this.setState({
      xVictory: this.state.xVictory + 1,
    });
	}

	addOVictory() {
    this.setState({
      oVictory: this.state.oVictory + 1,
    });
	}

	addDraw() {
    this.setState({
      draw: this.state.draw + 1,
    });
	}

	render() {
		return (
			<div className="game">
				<div className="game-name">
					React Tic-Tac-Toe
				</div>
				<div className="game-board">
					<Score
						xVictory={this.state.xVictory}
						oVictory={this.state.oVictory}
						draw={this.state.draw}
					/>
					<Board
						addXVictory={() => this.addXVictory()}
						addOVictory={() => this.addOVictory()}
						addDraw={() => this.addDraw()}
					/>
				</div>
				{/* <div className="game-info">
					<ol>TODO</ol>
				</div> */}
			</div>
		);
	}
	
}

export default Game;