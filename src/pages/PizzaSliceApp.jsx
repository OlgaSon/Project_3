import { useState } from 'react';
import {Link} from 'react-router-dom';
import {getPartyGuests} from '../api/partyGuestsAPI';
import {getDiets} from '../api/guestsDietsAPI';
import {getPizzaOrder} from '../api/pizzaOrderAPI';
import {getExchangeRates} from '../api/exchangeRatesAPI';
import Table from './Table';
import Pizza from './Pizza';
import './PizzaSliceApp.css';


function PizzaSliceApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [partyGuests, setPartyGuests] = useState([]);
  const [namesEaters, setNamesEaters] = useState([]);
  const [pizzaType, setPizzaType] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [pizzaEatersInfo, setPizzaEatersInfo] = useState([]);
  const [isReady, setIsReady] = useState(false);
  
  const selectPizzaType = async (vegans, eaters) => {
    const types = ['vegan', 'cheese'];
    const typeNumber = (Math.floor(Math.random() * 2));
    const type = (vegans.length / eaters.length > 0.51) ? types[typeNumber] : "meat";
    return type;
  };

  const handleClick = async () => {
    setIsLoading(true);
    const guestsList = await getPartyGuests();
    setPartyGuests(guestsList);
    const eaters = await guestsList.filter(person => person.eatsPizza);
    const eatersList = await eaters.map(person => person.name);
    setNamesEaters(eatersList);
    const vegansList = await getDiets(eatersList);
    const eatersAndVegans = eaters.map(el => {
      if (vegansList.find(item => item === el.name)) {
        return {...el, 'isVegan': true}
      } else 
      return {...el, 'isVegan': false}
    });
    const typeOfPizza = await selectPizzaType(vegansList, eatersList);
    setPizzaType(typeOfPizza);
    const responses = await Promise.all([getExchangeRates(), getPizzaOrder(typeOfPizza, eatersList.length)]);
    const exchangeRates = responses[0];
    const currency = responses[1].price.split(' ')[1];
    const pizzaPrice = responses[1].price.split(' ')[0];
    const totalPrice = Math.round(exchangeRates[currency] * pizzaPrice * 10) / 10;
    setTotalPrice(totalPrice);
    const pay = Math.ceil(totalPrice / eatersList.length * 10) / 10;
    const eatersAndVegansPay = eatersAndVegans.map(el => {return {...el, 'pay':pay}})
    setPizzaEatersInfo(eatersAndVegansPay);
    setIsReady(true);
    setIsLoading(false);
  };

  return (
    <>
      <Link to='/'>Feedback</Link>
      <section className="main">
        {!isLoading && <>
          <button id="load-btn" className="loadBtn" onClick={handleClick}>Load party</button>
          {!isReady && <p>Click👆 this button</p>}
        </>}
        {isLoading && <>
          <button id="load-btn" disabled className="loadBtn loading">Load party</button>
          <p>waiting...</p>
        </>}
        <div id="app">
          {isReady && !isLoading && <>
            <Pizza pizzaType={pizzaType} namesEaters={namesEaters}/>
            <p className='textContent'>{partyGuests.length} guests will be at the party and {namesEaters.length} of them will eat pizza:</p>
            <Table pizzaEatersInfo={pizzaEatersInfo} totalPrice={totalPrice}/>
          </>}
        </div>
      </section>
    </>
  );
};


export default PizzaSliceApp