import React from 'react';

class Score extends React.Component {
	render() {
		return (
			<div className="score">
        <div className="counter-x-victory">
          Nombre de victoire de x: {this.props.xVictory}
        </div>
			<div className="counter-o-victory">
				Nombre de victoire de o: {this.props.oVictory}
			</div>
			<div className="draw-counter">
				Nombre de matches nul: {this.props.draw}
			</div>
		</div>
		);
	}
	
}

export default Score;


