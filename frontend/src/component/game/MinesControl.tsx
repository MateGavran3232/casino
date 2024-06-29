function MinesControl() {
  return (
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
  );
}
