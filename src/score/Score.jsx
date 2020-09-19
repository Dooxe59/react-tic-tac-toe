import React from 'react';

class Score extends React.Component {
	state = {
		scores: {
			xVictory: 0,
			oVictory: 0,
			draw: 0,
		},
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
		return (
			<div className="score">
			<div className="counter-x-victory">
				Nombre de victoire de x: {this.props.scores.xVictory}
			</div>
			{/* <div className="counter-o-victory">
				Nombre de victoire de o: {this.state.scores.oVictory}
			</div>
			<div className="draw-counter">
				Nombre de matches nul: {this.state.scores.draw}
			</div> */}
		</div>
		);
	}
	
}

export default Score;


