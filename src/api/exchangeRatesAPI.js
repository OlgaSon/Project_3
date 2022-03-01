const url = 'https://gp-js-test.herokuapp.com/pizza';

export const getExchangeRates = async () => {
    try {
        const response = await fetch(`${url}/currency`);
        if (!response.ok) {
            throw new Error('Server Error');
        };
        const result = await response.json();
        return (result);
    } catch (error) {
        alert(error.message);
    };
};