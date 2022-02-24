import { useSelector} from 'react-redux';
import { selectGuestsInfo } from "../store/selectors";
import './GuestListItem.css'


const GuestListItem = ({guestId, handleClickGuest }) => {
  const guestsInfo = useSelector(selectGuestsInfo);
  const guest = guestsInfo.find(person=> person.id === guestId);
  const guestClass = guest.isVegan ? 'vegan' : guest.eatsPizza ? 'eater' : 'guest';
  const isFeedback = guestsInfo.find(item => item.id === guestId).phone ? true : false;

  return (<>
    <li>
      {isFeedback && <span>✔️</span>}
      <button
        onClick={handleClickGuest}
        disabled={!guest.eatsPizza}
        className={guestClass}>
          {guest.name}
      </button>
    </li>
    </>
  );
};


export default GuestListItem;