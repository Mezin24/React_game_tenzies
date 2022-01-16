import React from 'react';
import Die from './Die';
import RollDice from './RollDice';

export default function App() {
  const [dices, setDices] = React.useState(allNewDice());

  function allNewDice() {
    return [...Array(10)].map((item) => (item = randomDice()));
  }

  function randomDice() {
    return Math.ceil(Math.random() * 6);
  }

  function rollDice() {
    setDices(allNewDice());
  }
  const dicesElements = dices.map((die, i) => <Die value={die} key={i} />);

  return (
    <main>
      <div className='dies-container'>{dicesElements}</div>
      {<RollDice rollDice={rollDice} />}
    </main>
  );
}
