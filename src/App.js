import React from 'react';
import Die from './Die';
import RollDice from './RollDice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dices, setDices] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(
    () =>
      setTenzies(
        dices.every((item) => item.isHeld && item.value === dices[0].value)
      ),
    [dices]
  );

  function allNewDice() {
    return [...Array(10)].map(() => newDice());
  }

  function randomDice() {
    return Math.ceil(Math.random() * 6);
  }

  function newDice() {
    return {
      value: randomDice(),
      isHeld: false,
      id: nanoid(),
    };
  }

  // function rollDice() {
  //   setDices((prevState) =>
  //     prevState.map((item) => (item.isHeld ? item : newDice()))
  //   );
  // }
  function rollDice() {
    if (tenzies) {
      setDices(allNewDice());
      setTenzies(false);
      return;
    }
    setDices((prevState) =>
      prevState.map((item) => (item.isHeld ? item : newDice()))
    );
  }

  function holdDice(id) {
    setDices((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isHeld: !item.isHeld } : item
      )
    );
  }

  const dicesElements = dices.map((die, i) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const title = tenzies ? (
    <h1 className="title">Вы Победили!</h1>
  ) : (
    <h1 className="title">Tenzies</h1>
  );

  return (
    <main>
      {tenzies && (
        <Confetti width={window.innerWidth} height={window.innerHeightheight} />
      )}
      {title}
      <p className="instructions">
        Бросайте до тех пор, пока все кубики не станут одинаковыми. Нажмите на
        каждый кубик, чтобы зафиксировать его текущее значение между бросками.
      </p>
      <div className="dies-container">{dicesElements}</div>
      {<RollDice rollDice={rollDice} isOver={tenzies} />}
    </main>
  );
}
