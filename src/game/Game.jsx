import React from 'react';

import './game.css';
import Board from '../board/Board';

class Game extends React.Component {
	state = {
		scores: {
			xVictory: 0,
			oVictory: 0,
			draw: 0,
		}
	}

	addXVictory = () => {
		this.setState(currentState => {
			return {
				xVictory: currentState.scores.xVictory + 1,
			}
		});
	}

	addOVictory = () => {
		this.setState(currentState => {
			return {
				oVictory: currentState.scores.oVictory + 1,
			}
		});
	}

	addDraw = () => {
		this.setState(currentState => {
			return {
				draw: currentState.scores.draw + 1,
			}
		});
	}

	render() {
		// const newScores = this.state.scores;

		return (
			<div className="game">
				<div className="game-board">
					{/* Extraire en composant Score */}
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
					<Board 
						addXVictory={this.addXVictory}
						addOVictory={this.addOVictory}
						addDraw={this.addDraw}
					/>
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
	
}

export default Game;