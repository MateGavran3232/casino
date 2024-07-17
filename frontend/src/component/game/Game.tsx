import React, { useState } from "react";
import "../../styles/Game.scss";
import { Link, useLocation } from "react-router-dom";
import { GameProps } from "../../types";
import UpdateGameModal from "./UpdateGameModal";

const Game: React.FC<GameProps> = ({ data, deleteGame, role }) => {
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {role === "admin" && (
        <>
          {deleteGame && (
            <button onClick={() => deleteGame(data.id)}>Delete</button>
          )}
          <button onClick={handleUpdateClick}>Update</button>
        </>
      )}
      <div
        className={`gameContainer ${
          location.pathname === "/" ? `gameContainer${data.id}` : ``
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-testid="game-container"
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
      {isModalOpen && (
        <UpdateGameModal gameData={data} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Game;
