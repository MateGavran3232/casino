import React, { useRef, useState, useEffect, useCallback } from "react";
import "../../styles/ScrollableContainer.scss";

interface GamesContainerProps {
  children: React.ReactNode;
}

function ScrollableContainer({ children }: GamesContainerProps) {
  const gamesRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const disableSmoothScrolling = useCallback(() => {
    gamesRef.current?.style.setProperty("scroll-behavior", "unset");
  }, []);

  const enableSmoothScrolling = useCallback(() => {
    gamesRef.current?.style.setProperty("scroll-behavior", "smooth");
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setStartX(e.clientX - (gamesRef.current?.offsetLeft ?? 0));
      setScrollLeft(gamesRef.current?.scrollLeft ?? 0);
      disableSmoothScrolling();
    },
    [disableSmoothScrolling]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      const x = e.clientX - (gamesRef.current?.offsetLeft ?? 0);
      const walk = (x - startX) * 1.2;
      if (gamesRef.current) {
        gamesRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    console.log("aa");
    setIsDragging(false);
    enableSmoothScrolling();
  }, [isDragging, enableSmoothScrolling]);

  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        enableSmoothScrolling();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging, enableSmoothScrolling]);

  return (
    <div
      ref={gamesRef}
      className="scrollDiv"
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
}

export default ScrollableContainer;
