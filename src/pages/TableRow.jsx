import React from "react";
import {memo} from 'react'
import { useState } from 'react';


const TableRow = (props) => {
    const [paid, setPaid] = useState(false); 
    const eatersClass = props.person.isVegan ? 'vegan' : 'eater';

    const onPayClick = (e) => {
        props.setPayName(e.target.parentNode.parentNode.childNodes[0].innerText);
        setPaid(true);
    };

    return (
        <tr className="tableRow">
            <td className={eatersClass}>{props.person.name}</td>
            {!paid && <>
                <td>{props.person.pay} BYN</td>
                <td><button id='pay'
                onClick={(e)=>onPayClick(e)}
                >Pay</button></td>
            </>}
            {paid && <>
                <td>0 BYN</td>
                <td><button id='pay' disabled>Paid</button></td>
            </>}
        </tr>
    )
};


export default memo(TableRow);