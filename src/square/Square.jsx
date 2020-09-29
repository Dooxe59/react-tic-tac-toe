import React from 'react';

import './square.scss';

function Square({squareState, value, onClick}) {
	return (
		<button 
			className={`square ${squareClass(squareState)}`}
			onClick={onClick}
      aria-label="Bouton représentant une case du jeu"
		>
			{value}
		</button>
	);
}

const squareClass = (squareState) => {
	if (squareState === 'W') {
		return 'winner-square';
	} else if (squareState === 'L') {
		return 'looser-square';
	}
	return '';
};

export default Square;