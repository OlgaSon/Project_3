import { useState, useEffect } from 'react';
import TableRow from './TableRow'
import './Table.css'


const Table = (props) => {
    const [moneyToCollect, setMoneyToCollect] = useState(0);
    const [moneyCollected, setMoneyCollected] = useState(0);
    const [payName, setPayName] = useState('');
    const totalPriceByn = props.totalPrice;
    const pizzaEatersInfo= props.pizzaEatersInfo;
    const eaterPay = props.pizzaEatersInfo[0].pay;

    useEffect(() => {
        if (payName) {
        setMoneyCollected(prevMoneyCollected => (Math.floor((prevMoneyCollected + eaterPay) * 10) / 10));
            if (totalPriceByn > (moneyCollected + eaterPay))
                setMoneyToCollect(Math.round((totalPriceByn - moneyCollected - eaterPay) * 10) / 10);
            else setMoneyToCollect(0);
        }
    }, [payName]);
    
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
                {pizzaEatersInfo.map((person) => (
                    <TableRow
                        key={person.name}
                        person={person}
                        setPayName={setPayName}
                    />
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