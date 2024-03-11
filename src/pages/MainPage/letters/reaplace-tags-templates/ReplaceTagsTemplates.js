import React from 'react';

const ReplaceTagsTemplates = (letter, randomUser) => {
    console.log(randomUser, 'user info in replace')
    let { name, country, age } = randomUser;

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

    let countryState = getCountry();

    if (age === 0 || age === 'n/a' || age === '') {
        age = 'older than me';
        alert('Обратите внимание, что у мужчины не указан возраст в профиле, возраст был заменен на сообщение "older than me", но лучше уберите это предложение с текста')
    }

    if (countryState === '') {
        countryState = 'your country';
        alert('Обратите внимание, что у мужчины не указана страна в профиле, страна была заменена на сообщение "your country", но лучше уберите это предложение с текста');
    }

    if (city === '') {
        city = 'your city';
        alert('Обратите внимание, что у мужчины не указан город в профиле, город был заменен на сообщение "your city", но лучше уберите это предложение с текста');
    }

    const result = letter
        .replace('%Name%', fullName)
        .replace('%firstName%', firstRightName)
        .replace('%Age%', age)
        .replace('%Country%', countryState)
        .replace('%City%', city)
        .replace('[yes-photo]', '');

    return result;

};

export default ReplaceTagsTemplates;
