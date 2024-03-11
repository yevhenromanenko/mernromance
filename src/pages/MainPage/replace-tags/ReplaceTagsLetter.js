import React from 'react';

const ReplaceTagsLetter = (letter, randomUser) => {
    console.log(randomUser, 'user info in replace')
    const { name, country, age } = randomUser;

    let fullName = name.toString();
    let [firstName] = fullName.split(' ', 1);
    let firstRightName = firstName[0].toUpperCase() + firstName.slice(1);
    let [city, state, countryName] = country.split(', ');

    function getCountry() {
        if (countryName === undefined) {
            return state;
        } else if (state === undefined) {
            return countryName;
        } else {
            return '';
        }
    }

    const replaceTags = () => {
        let countryState = getCountry();

        let invalidAge = letter.includes('%Age%') && age === 'n/a';
        let invalidCountry = letter.includes('%Country%') && countryState === '';
        let invalidCity = letter.includes('%City%') && city === '';


        if (invalidAge || invalidCountry || invalidCity) {
            console.log('Ошибка отправки!');
            return letter;
        } else if (city.includes('/')) {
            const cityDed = city.split('/')[0];
            return letter.replace('%City%', cityDed);
        } else if (countryState.includes('/')) {
            const countryDed = countryState.split('/')[0];
            return letter.replace('%Country%', countryDed);
        }

        const result = letter
            .replace('%Name%', fullName)
            .replace('%firstName%', firstRightName)
            .replace('%Age%', age)
            .replace('%Country%', countryState)
            .replace('%City%', city)
            .replace('[yes-photo]', '');

        if (result.includes('%Name%') || result.includes('%firstName%') || result.includes('%Age%') ||
            result.includes('%Country%') || result.includes('%City%') || result.includes('[yes-photo]')) {
            return replaceTags();
        }

        return result;
    };

    return replaceTags();
};

export default ReplaceTagsLetter;
