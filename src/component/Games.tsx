import { useData } from "../hooks/useData";
import { useRef, useState, useEffect } from "react";
import "../styles/Games.css";
import Game from "./Game";

interface GameData {
  id: number;
  title: string;
  image: string;
  description: string;
  publisher: string;
}

function Games() {
  const { data } = useData();
  const gamesRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX - (gamesRef.current?.offsetLeft ?? 0));
    setScrollLeft(gamesRef.current?.scrollLeft ?? 0);
    gamesRef.current?.style.setProperty("scroll-behavior", "unset"); // Disable smooth scrolling during drag
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX - (gamesRef.current?.offsetLeft ?? 0);
    const walk = (x - startX) * 1.2; // Adjust the scrolling speed as needed
    if (gamesRef.current) {
      gamesRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    gamesRef.current?.style.setProperty("scroll-behavior", "smooth"); // Re-enable smooth scrolling after drag
  };

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
      <div ref={gamesRef} className="gamesDiv">
        {data.map((game: GameData) => (
          <Game key={game.id} data={game} />
        ))}
      </div>
    </div>
  );
}

export default Games;
