import React, { useState } from "react";
import "../../styles/Mines.scss";

function Mines() {
  const [mines, setMines] = useState<any>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [money, setMoney] = useState(100);
  const [multi, setMulti] = useState<number>(0);
  const [bet, setBet] = useState(0);
  const numberOfMines = 5;
  const createMines = (gridSize: number, numberOfMines: number) => {
    let indexesOfMines: number[] = [];
    while (indexesOfMines.length < numberOfMines) {
      const randomNumber = Math.floor(Math.random() * gridSize);
      if (indexesOfMines.indexOf(randomNumber) === -1) {
        indexesOfMines.push(randomNumber);
      }
    }
    let minesArr = Array.from({ length: gridSize }, (_, i) => ({
      safe: indexesOfMines.includes(i),
    }));
    setMines(minesArr);
  };

  const startGame = () => {
    createMines(25, numberOfMines);
    setIsGameOver(false);
    setMulti(1);
  };
  const handleGameOver = () => {
    setIsGameOver(true);
    setMulti(0);
    setBet(0);
  };
  const handleClick = (i, safe) => {
    const handleMinesArray = mines?.map((item, index) =>
      i === index
        ? {
            safe: safe,
            backgroundColor: !safe ? "green" : "red",
            multiplaer: multi,
            className: !safe ? "winMine" : "loseMine",
          }
        : item
    );
    if (!handleMinesArray) return;
    if (!!handleMinesArray.find((item) => item.backgroundColor === "red")) {
      handleGameOver();
    }
    const greens = handleMinesArray.filter(
      (item) => item.backgroundColor === "green"
    );
    let multiplaer = 1.3;
    for (let i = 0; i < greens.length; i++) {
      multiplaer += 0.3;
    }
    setMulti(Math.round(multiplaer * 100) / 100);
    setMines(handleMinesArray);
  };

  return (
    <div className="mines">
      <div className="minesControls">
        <button onClick={() => startGame()}>Bet</button>
        <div>
          <p>Bet Amount</p>
          <input
            placeholder="0.000000"
            onChange={(e) => setBet(Number(e.target.value))}
          ></input>
        </div>
        <button>Collect : {bet * multi}</button>
      </div>
      <div className="minesContainer">
        {mines?.map((item, i) => (
          <button
            key={i}
            className={`mine ${item.className}`}
            onClick={() => handleClick(i, item.safe)}
            disabled={isGameOver}
            style={{
              background: item.backgroundColor,
            }}
          >
            {item.multiplaer}
          </button>
        ))}
        <div
          className="gameOver"
          style={{
            opacity: !isGameOver ? "0" : "100",
            transition: "opacity 0.25s linear",
            zIndex: !isGameOver ? "-10" : "100",
          }}
        >
          Game Over
        </div>
      </div>
    </div>
  );
}
export default Mines;
