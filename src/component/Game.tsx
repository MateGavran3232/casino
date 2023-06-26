import React, { useState } from "react";
import "../styles/Game.scss";

interface GameProps {
  data: {
    id: number;
    title: string;
    image: string;
    description: string;
    publisher: string;
  };
}

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
          <button className="gameButton">Play Now</button>
        </div>
      )}
    </div>
  );
};

export default Game;
