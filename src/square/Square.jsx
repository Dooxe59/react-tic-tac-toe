import React from 'react';

import './square.css';

function Square(props) {
	return (
		<button 
			className={`square ${squareClass(props.squareState)}`}
			onClick={props.onClick}
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