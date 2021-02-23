import React from 'react';
import './ExploreDifficulty.css';
function ExploreDifficulty() {
  return (
    <div className="explore-difficulty">
      <div className="header-last">
        <h2>Les difficultées</h2>
      </div>
      <div className="card-content-dif">
        <div className="difficulty">
          <div className="difficulty-card easy">
            <h3>Easy</h3>
          </div>
        </div>
        <div className="difficulty">
          <div className="difficulty-card medium">
            <h3>Medium</h3>
          </div>
        </div>
        <div className="difficulty">
          <div className="difficulty-card hard">
            <h3>Hard</h3>
          </div>
        </div>
        <div className="difficulty">
          <div className="difficulty-card extreme">
            <h3>Extreme</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreDifficulty;
