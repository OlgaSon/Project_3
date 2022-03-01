export const selectGuestsInfo = (state) => {
    return state.guestsInfo.guestsInfo
};


export const selectGuestById = (guestId) => (state) => {
    return state.guestsInfo.guestsInfo.find(el => el.id === guestId)}