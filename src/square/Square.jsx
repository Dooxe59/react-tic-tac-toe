import React from 'react';

import './square.scss';

function Square(props) {
	return (
		<button 
			className={`square ${squareClass(props.squareState)}`}
			onClick={props.onClick}
      aria-label="Bouton représentant une case du jeu"
		>
			{props.value}
		</button>
	);
}

const squareClass = (squareState) => {
	if(squareState === 'W') {
		return 'winner-square';
	} else if(squareState === 'L') {
		return 'looser-square';
	}
	return '';
};

export default Square;