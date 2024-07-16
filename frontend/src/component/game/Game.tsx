import React, { useState } from "react";
import "../../styles/Game.scss";
import { Link, useLocation } from "react-router-dom";
import { GameProps } from "../../types";

const Game: React.FC<GameProps> = ({ data, deleteGame, role }) => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`gameContainer ${
        location.pathname === "/" ? `gameContainer${data.id}` : ``
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid="game-container"
    >
      {role === "admin" && deleteGame && (
        <button onClick={() => deleteGame(data.id)}>Delete</button>
      )}
      <img loading="lazy" className="gameImg" src={data.image} />
      {hovered && (
        <div className="gameContent">
          <h3 className="gameTitle">{data.title}</h3>
          <Link to={`/games/${data.id}`}>
            <button className="gameButton">Play Now</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Game;
