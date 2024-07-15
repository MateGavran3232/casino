import React, { useState } from "react";
import "../../styles/Mines.scss";
import useDataStore from "../../store/useDataStore";

function Mines() {
  const [mines, setMines] = useState<any>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [money, setMoney] = useState(0);
  const [multi, setMulti] = useState<number>(0);
  const [bet, setBet] = useState(0);
  const [isGamesStarted, setIsGameStarted] = useState(false);
  const { user, handleBetStart, handleBetWon } = useDataStore((state) => ({
    user: state.user,
    handleBetStart: state.actions.handleBetStart,
    handleBetWon: state.actions.handleBetWon,
  }));

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
    if (money > 0) {
      createMines(25, numberOfMines);
      setIsGameOver(false);
      setIsGameStarted(true);
      setMulti(1);
      setBet(money);
      handleBetStart(Number(user?.user_id).toString(), money.toString());
    }
  };
  const handleGameOver = () => {
    setIsGameStarted(false);
    setIsGameOver(true);
    setMulti(0);
    setBet(0);
  };
  const handleMineClick = (i: number, safe: boolean) => {
    const handleMinesArray = mines?.map((item: any, index: number) =>
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
    if (
      !!handleMinesArray.find((item: any) => item.backgroundColor === "red")
    ) {
      handleGameOver();
    }
    const greens = handleMinesArray.filter(
      (item: any) => item.backgroundColor === "green"
    );
    let multiplaer = 1.5;
    for (let i = 0; i < greens.length; i++) {
      multiplaer *= 1.25;
    }
    setMulti(Math.round(multiplaer * 100) / 100);
    setMines(handleMinesArray);
  };

  const handleMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMoney(Number(e.target.value));
  };

  const handleWin = () => {
    handleBetWon(
      (bet * multi).toFixed(2).toString(),
      Number(user?.user_id)?.toString()
    );
    setIsGameOver(true);
    setIsGameStarted(false);
    setMulti(0);
    setBet(0);
  };
  return (
    <div className="mines">
      <div className="minesControls">
        <div>
          <p>Bet Amount</p>
          <input
            placeholder="0.000000"
            onChange={(e) => handleMoney(e)}
          ></input>
        </div>
        {!isGamesStarted ? (
          <button
            onClick={() => startGame()}
            disabled={money > Number(user?.money)}
          >
            Bet
          </button>
        ) : (
          <button onClick={() => handleWin()}>
            Collect : {(bet * multi).toFixed(2)}
          </button>
        )}
      </div>
      <div className="minesContainer">
        {mines?.map((item: any, i: number) => (
          <button
            key={i}
            className={`mine ${item.className}`}
            onClick={() => handleMineClick(i, item.safe)}
            disabled={isGameOver || item.backgroundColor === "green"}
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
