import { useState } from 'react';
import {Link} from 'react-router-dom';
import Table from './Table';
import Pizza from './Pizza';
import './PizzaSliceApp.css';


function PizzaSliceApp() {
  const url = 'https://gp-js-test.herokuapp.com/pizza';
  const [isLoading, setIsLoading] = useState(false);
  const [partyGuests, setPartyGuests] = useState([]);
  const [namesEaters, setNamesEaters] = useState([]);
  const [namesVegans, setNamesVegans] = useState([]);
  const [pizzaType, setPizzaType] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [pay, setPay] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const getPartyGuests = async () => {
    const response = await fetch(`${url}/guests`);
    const result = await response.json();
    const party = await result.party;
    setPartyGuests(party);
    return party;
  };

  const findPizzaEaters = (guests) => {
    const eaters = guests.filter(person => person.eatsPizza);
    const namesEatersArr = eaters.map(person => person.name);
    setNamesEaters(namesEatersArr);
    return namesEatersArr;
  };

  const getDiets = async (names) => {
    const response = await fetch(`${url}/world-diets-book/${String(names)}`);
    const result = await response.json();
    const diets = await result.diet;
    const vegans = diets.filter((person) => person.isVegan);
    const namesVegansArr = vegans.map(person => person.name);
    setNamesVegans(namesVegansArr);
    return namesVegansArr;
  };

  const selectPizzaType = async (vegans, eaters) => {
    const types = ['vegan', 'cheese'];
    const typeNumber = (Math.floor(Math.random() * 2));
    const type = (vegans.length / eaters.length > 0.51) ? types[typeNumber] : "meat";
    setPizzaType(type);
    return type;
  };

  const getPizzaOrder = async (type, slices) => {
    let response = await fetch(`${url}/order/${type}/${slices}`);
    let result = await response.json();
    return (result);
  };

  const getExchangeRates = async () => {
    let response = await fetch(`${url}/currency`);
    let result = await response.json();
    return (result);
  };

  const handleClick = async () => {
    setIsLoading(true);
    document.getElementById('load-btn').disabled = true;
    document.getElementById('load-btn').classList.add('loading');
    const guestsList = await getPartyGuests();
    const eatersList = await findPizzaEaters(guestsList);
    const vegansList = await getDiets(eatersList);
    const typeOfPizza = await selectPizzaType(vegansList, eatersList);
    const responses = await Promise.all([getExchangeRates(), getPizzaOrder(typeOfPizza, eatersList.length)]);
    const exchangeRates = responses[0];
    const currency = responses[1].price.split(' ')[1];
    const pizzaPrice = responses[1].price.split(' ')[0];
    const totalPrice = Math.round(exchangeRates[currency] * pizzaPrice * 10) / 10;
    const pay = Math.ceil(totalPrice / eatersList.length * 10) / 10;
    setTotalPrice(totalPrice);
    setPay(pay);
    setIsReady(true);
    setIsLoading(false);
    document.getElementById('load-btn').classList.remove('loading');
    document.getElementById('load-btn').disabled = false;
  };

  return (
    <>
      <Link to='/'>Feedback</Link>
      <section className="main">
        <button id="load-btn" className="loadBtn" onClick={handleClick}>Load party</button>
        <div id="app">
          {!isLoading && !isReady && <p>Click👆 this button</p>}
          {isLoading && <p>waiting...</p>}
          {isReady && !isLoading &&
            <Pizza pizzaType={pizzaType} namesEaters={namesEaters}></Pizza>}
          {isReady && !isLoading &&
            <p className='textContent'>{partyGuests.length} guests will be at the party and {namesEaters.length} of them will eat pizza:</p>}
          {isReady && !isLoading &&
            <Table namesEaters={namesEaters} namesVegans={namesVegans} totalPrice={totalPrice} pay={pay}></Table>}
        </div>
      </section>
    </>
  );
};


export default PizzaSliceApp