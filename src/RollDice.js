export default function RollDice(props) {
  const text = props.isOver ? 'Новая Игра' : 'Бросить Кости';
  return (
    <button className="roll" onClick={props.rollDice}>
      {text}
    </button>
  );
}
