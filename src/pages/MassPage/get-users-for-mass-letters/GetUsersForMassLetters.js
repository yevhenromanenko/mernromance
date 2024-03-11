// import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetUsersForMassLetters = async () => {
    const getPageData = async (page) => {
        const url = `https://login.romancecompass.com/letters/`;
        const headers = {
            'accept': 'text/html, */*; q=0.01',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/x-www-form-urlencoded',
            'x-requested-with': 'XMLHttpRequest',
        };
        const referrer = 'https://login.romancecompass.com/letters/';
        const referrerPolicy = 'strict-origin-when-cross-origin';
        const body = `route=inbox${page > 1 ? `%2Fpage${page}` : ''}&ajax=1`;

        const response = await axios.post(url, body, {
            headers,
            referrer,
            referrerPolicy,
            mode: 'cors',
            credentials: 'include',
        });
        const data = response.data;

        const regex = /<a href="\/man\/(\d+)\/" target="_blank" class="name">([^<]+)<\/a>/g;
        const matches = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
            const id = match[1];
            const name = match[2];
            matches.push({ id, name });
        }

        return matches;
    };

    const getAllData = async () => {
        const allData = [];
        let currentPage = 1;
        let hasMorePages = true;

        while (hasMorePages) {
            const pageData = await getPageData(currentPage);

            pageData.forEach((data) => {
                const { id, name } = data;
                const existingData = allData.find((item) => item.id === id);

                if (!existingData) {
                    allData.push({ id, name });
                }
            });
            currentPage++;
            hasMorePages = pageData.length > 0;
        }

        return allData;
    };

    try {
        const data = await getAllData();
        return data;
    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
};

export default GetUsersForMassLetters;
