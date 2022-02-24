import { useDispatch, useSelector } from 'react-redux';
import { selectGuestsInfo } from "../store/selectors";
import { removeFeedback } from '../store/guestsInfoSlice'; 
import StarRating from './StarRating'
import "./FeedbackForm.css"


const FeedbackFormFilled = ({guestId, handleCancel}) => {
  const dispatch = useDispatch();
  const guestsInfo = useSelector(selectGuestsInfo);
  const guest = guestsInfo.find(person=> person.id === guestId)
 
  return (
    <form className="feedbackForm filledForm">
        <button className='deleteBtn'
          onClick={() => dispatch(removeFeedback({guestId}))}
          >&times; Delete
        </button>

        <label>Name:
          <p className='nameInForm'>{guest.name}</p>
        </label>

        <StarRating
          numSelectedStars={guest.rating}
          // setNumSelectedStars={false}
        />     

        <label>Phone:
          <input value={guest.phone} disabled></input>
        </label>

        <label>Comment:<br/>
          <textarea value={guest.comment} disabled></textarea>
        </label>

        <button type="reset" onClick={handleCancel}>Cancel</button>
    </form>
  );
};


export default FeedbackFormFilled;