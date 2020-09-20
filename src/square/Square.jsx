import React from 'react';

import './square.css';

function Square(props) {
	return (
		<button 
			className={`square ${squareClass(props.winnerSquare)}`}
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

const squareClass = (winnerSquare) => {
	if(!winnerSquare) return;
	return 'winner-square';
};

export default Square;