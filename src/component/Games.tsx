import { useData } from "../hooks/useData";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import "../styles/Games.scss";
import Game from "./Game";

interface GameData {
  id: number;
  title: string;
  image: string;
  description: string;
  publisher: string;
}

interface GameProps {
  publisher?: string;
}

function Games({ publisher }: GameProps) {
  const { data } = useData();
  const gamesRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const filteredData = useMemo(() => {
    if (Array.isArray(data)) {
      if (publisher === "Popular") {
        return data.slice(5, 15);
      }
      return data.filter((game: GameData) => game.publisher === publisher);
    }
    return [];
  }, [data, publisher]);
  const limitedData = useMemo(() => filteredData.slice(0, 12), [filteredData]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX - (gamesRef.current?.offsetLeft ?? 0));
    setScrollLeft(gamesRef.current?.scrollLeft ?? 0);
    gamesRef.current?.style.setProperty("scroll-behavior", "unset"); // Disable smooth scrolling during drag
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.clientX - (gamesRef.current?.offsetLeft ?? 0);
      const walk = (x - startX) * 1.2; // Adjust the scrolling speed as needed
      if (gamesRef.current) {
        gamesRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    gamesRef.current?.style.setProperty("scroll-behavior", "smooth"); // Re-enable smooth scrolling after drag
  }, []);

  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        gamesRef.current?.style.setProperty("scroll-behavior", "smooth"); // Re-enable smooth scrolling after drag
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging]);

  if (!Array.isArray(data)) {
    return <div>Loading</div>;
  }

  return (
    <div
      className="gamesContainer"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="titleDiv">
        <h2>{publisher} Games</h2>
        <p>Show All {">"}</p>
      </div>
      <div
        ref={gamesRef}
        className={publisher !== "Popular" ? "gamesDiv" : "popularDiv"}
      >
        {limitedData.map((game: GameData) => (
          <div className={`game${game.id}`}>
            <Game key={game.id} data={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
