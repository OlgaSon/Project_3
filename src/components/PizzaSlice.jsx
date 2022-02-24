import './PizzaSlice.css';

const PizzaSlice = (params) => {
  const eatersNumber = params.eatersNumber;
  const cutCounter = params.cutCounter;
  const rotateAngle = 360 / eatersNumber * cutCounter;
  return (
    <div className="pizzaSlice"
      style={{ transform: `rotate(${rotateAngle}deg)` }}
    ></div>
  );
};
  
  
export default PizzaSlice;