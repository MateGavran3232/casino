import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { useState, useEffect } from "react";
import "../styles/GameDetailes.scss";

interface gameData {
  bigImage: string;
  title: string;
  description: string;
  publisher: string;
}

function GameDetailes() {
  const { id } = useParams();
  const { data } = useData();
  const [gameData, setGameData] = useState<gameData>({
    bigImage: "",
    title: "",
    description: "",
    publisher: "",
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredArr = data.filter((item) => item.id == id);

      setGameData(filteredArr[0]);
    }
  }, [data, id]);

  return (
    <div className="gameDetailesContainer">
      <img src={gameData.bigImage} className="gameImg"></img>
      <div className="gameDetailesDiv">
        <h1>{gameData.title}</h1>
        <p>{gameData.description}</p>
        <p>Publisher: {gameData.publisher}</p>
      </div>
    </div>
  );
}

export default GameDetailes;
