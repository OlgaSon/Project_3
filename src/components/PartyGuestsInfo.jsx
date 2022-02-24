import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import  {Link} from 'react-router-dom';
import {getPartyGuests} from '../api/PartyGuestsAPI';
import {getDiets} from '../api/GuestsDietsAPI';
import GuestsFeedback from './GuestsFeedback';
import {selectGuestsInfo} from "../store/selectors";
import {createGuestsInfo} from '../store/guestsInfoSlice';


const PartyGuestsInfo = () => {
    const dispatch = useDispatch();
    const guestsInfo = useSelector(selectGuestsInfo);

    const findPizzaEaters = (guests) => {
        const eaters = guests.filter(person => person.eatsPizza);
        const namesEatersArr = eaters.map(person => person.name);
        return namesEatersArr;
    };

    const receiveGuestsInfo = async () => {
        if (!guestsInfo.length) {
            const partyGuests = await getPartyGuests();
            const namesEaters = await findPizzaEaters(partyGuests);
            const namesVegans = await getDiets(namesEaters);
            const guestsInfo = await partyGuests.map((item => {
                const isVeg = namesVegans.includes(item.name);
                return {
                    ...item,
                    isVegan: isVeg,
                };
            }));
            dispatch(createGuestsInfo(guestsInfo));
        };
    };

    useEffect(() => {
        receiveGuestsInfo();
    }, []);

    return (
        <>
            <Link to='/pizzaSliceApp'>Pizza</Link>
            <section className="main">
                <GuestsFeedback/>
            </section>
        </>
    )
};


export default PartyGuestsInfo;