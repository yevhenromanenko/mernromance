import React from 'react';
import UcFirst from "../invites/uc-first/UcFirst";

const ReplaceTags = (randomInvite, randomUser) => {
    const inviteToSend = randomInvite.text;
    const { name, country, age, photo_m_src } = randomUser;

    let fullName = name.toString();
    let [firstName] = fullName.split(' ', 1);
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
        let noPhoto = photo_m_src === null;

        let invalidAge = inviteToSend.includes('%Age%') && age === 'n/a';
        let invalidCountry = inviteToSend.includes('%Country%') && countryState === '';
        let invalidCity = inviteToSend.includes('%City%') && city === '';
        let invalidPhoto = inviteToSend.includes('[yes-photo]') && noPhoto;
        let invalidNoPhoto = inviteToSend.includes('[no-photo]') && !noPhoto;

        if (invalidAge || invalidCountry || invalidCity || invalidPhoto || invalidNoPhoto) {
            console.log('Ошибка отправки инвайта!');
            return inviteToSend;
        } else if (inviteToSend.includes('[no-photo]') && noPhoto) {
            return inviteToSend.replace('[no-photo]', '');
        } else if (city.includes('/')) {
            const cityDed = city.split('/')[0];
            return inviteToSend.replace('%City%', cityDed);
        } else if (countryState.includes('/')) {
            const countryDed = countryState.split('/')[0];
            return inviteToSend.replace('%Country%', countryDed);
        }

        const result = inviteToSend
            .replace('%Name%', fullName)
            .replace('%firstName%', UcFirst(firstName))
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

export default ReplaceTags;
