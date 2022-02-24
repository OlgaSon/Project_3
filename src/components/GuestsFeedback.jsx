import { useState } from "react";
import {  useSelector, useDispatch} from 'react-redux';
import { selectGuestsInfo } from "../store/selectors";
import GuestListItem from './GuestListItem';
import FeedbackFormNew from './FeedbackFormNew';
import FeedbackFormFilled from './FeedbackFormFilled';
import { clearGuestsInfo } from '../store/guestsInfoSlice';
import "./GuestsFeedback.css";


const GuestsFeedback = () => {
  const dispatch = useDispatch();
  const guestsInfo = useSelector(selectGuestsInfo);
  const [id, setId] = useState('');
  const [isFeedback, setIsFeedback] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    
  const handleClickGuest=(e)=>{
    setId(e.target.innerText);
    if (guestsInfo.find(item => item.id === e.target.innerText).phone) {
      setIsFeedback(true)
    };
    setShowFeedbackForm(true);
  };

  const handleCancel=()=>{
    setIsFeedback(false);
    setShowFeedbackForm(false);
  };

  const handleClear = () => {
    dispatch(clearGuestsInfo());
    document.location.reload();
  };

  return (
    <>
      {!showFeedbackForm && <>
        <ul className="guestsList">
          {guestsInfo.map((guest) => (
            <GuestListItem
              key={(Date.now()*Math.random())}
              guestId = {guest.id}
              handleClickGuest = {handleClickGuest} 
            />
          ))}
        </ul>
        <button onClick={handleClear}>Clear app</button>
      </>}
      
      {showFeedbackForm && !isFeedback &&
        <FeedbackFormNew
          guestId = {id}
          setShowFeedbackForm={setShowFeedbackForm}
          handleCancel={handleCancel}
        />
      }

      {showFeedbackForm && isFeedback &&
        <FeedbackFormFilled
          guestId = {id}
          handleCancel={handleCancel}
        />
      }
    </>
  );
};


export default GuestsFeedback;