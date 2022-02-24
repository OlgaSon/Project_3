const TableRow = (props) => {
    const guestname = props.person;
    const vegans = props.vegans;
    const eatersClass = vegans.includes(guestname) ? 'vegan' : 'eater';

    return (
        <tr className="tableRow">
            <td className={eatersClass}>{props.person}</td>
            <td>{props.eaterPay} BYN</td>
            <td><button id="pay"onClick={props.onPayClick}>{props.payText}</button></td>
        </tr>
    )
};


export default TableRow;