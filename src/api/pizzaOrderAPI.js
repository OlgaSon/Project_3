const url = 'https://gp-js-test.herokuapp.com/pizza';

export const getPizzaOrder = async (type, slices) => {
    try {
        const response = await fetch(`${url}/order/${type}/${slices}`);
        if (!response.ok) {
            throw new Error('Server Error');
        };
        const result = await response.json();
        return (result);
    } catch (error) {
        alert(error.message);
    };
};