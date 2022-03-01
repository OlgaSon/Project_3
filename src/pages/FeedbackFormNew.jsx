import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector, useDispatch} from 'react-redux';
import {addFeedback} from '../store/guestsInfoSlice';
import {selectGuestById} from "../store/selectors";
import StarRating from '../components/StarRating'
import "./FeedbackForm.css"


const FeedbackFormNew = ({ guestId, handleCancel, setShowFeedbackForm }) => {
  const {
      register,
      formState: {
          errors,
          isValid,
      },
      handleSubmit,
      getValues,
  } = useForm({
      mode: 'onBlur'
  });

  const dispatch = useDispatch();
  const guest = useSelector(selectGuestById(guestId));
  const [numSelectedStars, setNumSelectedStars] = useState(3);

  const handleSave = () => {
    const newFormData = (getValues());
    dispatch(addFeedback({...newFormData, guestId, numSelectedStars}));
    setShowFeedbackForm(false);
  };

  return (
    <form
      className="feedbackForm newForm" 
      onSubmit={handleSubmit(handleSave)}
    >
      <label>Name:
        <p className='nameInForm'>{guest.name}</p> 
      </label>     

      <StarRating 
      numSelectedStars = {numSelectedStars}
      setNumSelectedStars = {setNumSelectedStars}
      />

      <label>Phone:
        <input type="phone"
        {...register('phone', {
            required: 'Phone number is required',
            pattern: {
                value: /^\+\d+\(|\s?\d+\s?|\)\d+\s?\d{1,10}$/,
                message: 'Use +, numbers, () or space char'
            },
            minLength: {
                value:3,
                message: 'Minimum length - 3 chars'
            },
            maxLength: {
                value:10,
                message: 'Maximum  length - 10 chars'
            },
        })}
        />
        <div>{errors?.phone && <span className="error">{errors?.phone?.message || 'Error: phone number is wrong!'}</span>}</div>
      </label>

      <label>Comment:<br/>
        <textarea {...register("comment")}/>
      </label>

      {!isValid && <button type="reset" onClick={handleCancel}>Cancel</button>}
      {isValid && <button type="submit">Save</button>}
    </form>
  )
};


export default FeedbackFormNew;