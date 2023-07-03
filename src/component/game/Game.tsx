import React, { useState } from "react";
import "../../styles/Game.scss";
import { Link } from "react-router-dom";
import { GameProps } from "../../types";

const Game: React.FC<GameProps> = ({ data }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`gameContainer gameContainer${data.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
