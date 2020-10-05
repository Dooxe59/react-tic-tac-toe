import PropTypes from "prop-types";
import React from "react";

import "./score.scss";

const Score = ({ xVictory, draw, oVictory }) => (
  <div className="score">
    <div className="counter-x-victory">
      <div className="first-player-label">Joueur 1 (X)</div>
      <div data-testid="first-player-score" className="first-player-score">
        {xVictory}
      </div>
    </div>
    <div className="draw-counter">
      <div className="draw-label">Nul</div>
      <div data-testid="draw-score" className="draw-score">
        {draw}
      </div>
    </div>
    <div className="counter-o-victory">
      <div data-testid="second-player-score" className="second-player-score">
        {oVictory}
      </div>
      <div className="second-player-label">Joueur 2 (O)</div>
    </div>
  </div>
);

Score.propTypes = {
  xVictory: PropTypes.number.isRequired,
  draw: PropTypes.number.isRequired,
  oVictory: PropTypes.number.isRequired,
};

export default Score;
