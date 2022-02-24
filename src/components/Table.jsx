import React from "react";
import { useState, useCallback } from 'react';
import TableRow from './TableRow'
import './Table.css';


const Table = (props) => {
    const [moneyToCollect, setMoneyToCollect] = useState(0);
    const [moneyCollected, setMoneyCollected] = useState(0);

    const eaters = props.namesEaters;
    const vegans = props.namesVegans;
    const totalPriceByn = props.totalPrice;
    const eaterPay = props.pay;
    const payText = "Pay";

    const onPayClick =
        useCallback((e) => {
            e.target.disabled = true;
            e.target.parentNode.parentNode.childNodes[1].innerText = "0 BYN";
            e.target.innerText = "Paid";
            setMoneyCollected(prevMoneyCollected => (Math.floor((prevMoneyCollected + eaterPay) * 10) / 10));
            if (totalPriceByn > (moneyCollected + eaterPay))
                setMoneyToCollect(Math.round((totalPriceByn - moneyCollected - eaterPay) * 10) / 10);
            else setMoneyToCollect(0);
        }, [moneyCollected, totalPriceByn, eaterPay]);

    return (
        <table className="guests">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Share to pay</th>
                    <th>Pay</th>
                </tr>
            </thead>
            <tbody>
                {eaters.map((person) => (
                    <TableRow
                        key={person}
                        person={person}
                        eaterPay={eaterPay}
                        vegans={vegans}
                        onPayClick={onPayClick}
                        payText={payText}
                    ></TableRow>
                ))}
                <tr className="resultRow">
                    <td>Total order</td>
                    <td>{totalPriceByn} BYN</td>
                </tr>
                <tr>
                    <td>Money to collect</td>
                    <td>{moneyToCollect} BYN</td>
                </tr>
                <tr>
                    <td>Money collected</td>
                    <td>{moneyCollected} BYN</td>
                </tr>
            </tbody>
        </table>
    );
};


export default Table;