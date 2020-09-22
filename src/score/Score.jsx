import React from 'react';

import './score.css';

class Score extends React.Component {
	render() {
		return (
			<div className="score">
        <div className="counter-x-victory">
          <div className="first-player-label">
            Joueur 1 (X)
          </div>
          <div className="first-player-score">
            {this.props.xVictory}
          </div>
        </div>
        <div className="draw-counter">
          <div className="draw-label">
            Nul
          </div>
          <div className="draw-score">
            {this.props.draw}
          </div>
        </div>
        <div className="counter-o-victory">
          <div className="second-player-score">
            {this.props.oVictory}
          </div>
          <div className="second-player-label">
            Joueur 2 (O)
          </div>
        </div>
		  </div>
		);
	}
	
}

export default Score;


