import React from "react";
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
  return (
    <div className="gameContainer">
      <img className="gameImg" src={data.image} />
    </div>
  );
};

export default Game;
