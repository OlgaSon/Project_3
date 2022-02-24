const url = 'https://gp-js-test.herokuapp.com/pizza';

export const getDiets = async (names) => {
    try {
        const response = await fetch(`${url}/world-diets-book/${String(names)}`);
        if (!response.ok) {
            throw new Error('Server Error');
        };
        const result = await response.json();
        const vegans = result.diet.filter((person) => person.isVegan);
        const namesVegansArr = vegans.map(person => person.name);
        return namesVegansArr;
    } catch (error) {
        alert(error.message);
    };
};