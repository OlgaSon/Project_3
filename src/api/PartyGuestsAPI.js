const url = 'https://gp-js-test.herokuapp.com/pizza';

export const getPartyGuests = async () => {
    try {
        const response = await fetch(`${url}/guests`);
        if (!response.ok) {
            throw new Error('Server Error');
        };
        const result = await response.json();
        return result.party;
    } catch (error) {
        alert(error.message);
    };
};