import { createSlice } from '@reduxjs/toolkit';


const guestsInfoSlice = createSlice({
    name: 'guestsInfo',
    initialState: {
        guestsInfo: [],
    },
    reducers: {
        createGuestsInfo(state, action) {
            action.payload.map(guest =>state.guestsInfo.push({id: guest.name, ...guest}))
        },

        addFeedback(state, action) {
            state.guestsInfo = state.guestsInfo.map(guest => {
                if (guest.id === action.payload.guestId) {
                    return {...guest, 
                        rating: action.payload.numSelectedStars,
                        phone: action.payload.phone,
                        comment: action.payload.comment,
                        }
                } else return guest
            });
        },

        removeFeedback(state, action) {
            state.guestsInfo = state.guestsInfo.map(guest => {
                if (guest.id === action.payload.guestId) {
                    return {
                        id: guest.id,
                        name: guest.name,
                        eatsPizza: guest.eatsPizza,
                        isVegan: guest.isVegan,
                        }
                } else return guest
            });
        },

        clearGuestsInfo(state, action) {
            state.guestsInfo = [];
        }
    },
});


export const {
    createGuestsInfo,
    addFeedback,
    removeFeedback,
    clearGuestsInfo,
} = guestsInfoSlice.actions;


export default guestsInfoSlice.reducer;