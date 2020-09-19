import React from 'react';

import './game.css';
import Board from '../board/Board';
// import Score from '../score/Score';

class Game extends React.Component {
	addXVictory() {
		console.log('X victory');
	}

	addOVictory() {
		console.log('O victory');
	}

	addDraw() {
		console.log('addDraw');
	}

	render() {
		return (
			<div className="game">
				<div className="game-board">
					{/* <Score
						addXVictory={this.addXVictory}
						addOVictory={this.addOVictory}
						addDraw={this.addDraw}
					/> */}
					<Board
						addXVictory={() => this.addXVictory()}
						addOVictory={() => this.addOVictory()}
						addDraw={() => this.addDraw()}
					/>
				</div>
				<div className="game-info">
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
	
}

export default Game;