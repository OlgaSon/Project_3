import './style.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate } from 'redux-persist/integration/react';
import store, {persistor} from './store';
import PartyGuestsInfo from './components/PartyGuestsInfo';
import PizzaSliceApp from './components/PizzaSliceApp';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<h3>loading...</h3>} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PartyGuestsInfo/>} />
            <Route path='/pizzaSliceApp' element={<PizzaSliceApp></PizzaSliceApp>} />
            <Route path="*" element={<div>Eror 404: page not found</div>}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};


export default App;