import PizzaSlice from './PizzaSlice'
import './Pizza.css';


const Pizza = (params) => {
  const eaters = params.namesEaters;
  const rotateAnglePizza = Math.floor(Math.random() * 360);
  return (
    <div className={`pizza ${params.pizzaType}`}
    style={{ transform: `rotate(${rotateAnglePizza}deg)` }}
    >
      {eaters.map((person) => (
        (eaters.indexOf(person) % 2 === 0) && 
        <PizzaSlice
          key={person}
          eatersNumber={eaters.length}
          cutCounter={eaters.indexOf(person) / 2}
        />
      ))}
    </div>
  );
};


export default Pizza;