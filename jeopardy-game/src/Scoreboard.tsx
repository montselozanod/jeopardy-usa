import React from 'react';

interface ScoreboardProps {
  scores: number[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores }) => {
  return (
    <div>
      <h2>Scores</h2>
      <div>Team 1: {scores[0]}</div>
      <div>Team 2: {scores[1]}</div>
    </div>
  );
};

export default Scoreboard;
