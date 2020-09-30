import PropTypes from "prop-types";

import React from "react";

import "./square.scss";

const Square = ({ squareState, value, onClick }) => {
  const squareClass = (squareState) => {
    if (squareState === "W") {
      return "winner-square";
    } else if (squareState === "L") {
      return "looser-square";
    }
    return "";
  };

  return (
    <button
      className={`square ${squareClass(squareState)}`}
      onClick={onClick}
      aria-label="Bouton représentant une case du jeu"
    >
      {value}
    </button>
  );
};

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  squareState: PropTypes.oneOf(["W", "L", undefined]),
};

export default Square;
