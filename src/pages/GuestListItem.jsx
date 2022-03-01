import { useSelector} from 'react-redux';
import { selectGuestById } from "../store/selectors";
import './GuestListItem.css'


const GuestListItem = ({guestId, handleClickGuest }) => {
  const guest = useSelector(selectGuestById(guestId));
  const guestClass = guest.isVegan ? 'vegan' : guest.eatsPizza ? 'eater' : 'guest';
  const isFeedback = guest.phone ? true : false;

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