import React, {useEffect, useState} from 'react';
import * as cheerio from "cheerio";
import axios from "axios";

const GlobalUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let currentPage = 1;
            let usersData = [];

            while (true) {
                const url = `https://login.romancecompass.com/search/results/page${currentPage}/?filter[id]=&filter[age_from]=18&filter[age_to]=89&filter[height_from]=&filter[height_to]=&filter[weight_from]=&filter[weight_to]=&filter[country]=&filter[children]=&filter[marital_status]=&filter[religion]=&filter[ethnicity]=&filter[eyes_color]=&filter[hair_color]=&filter[body_type]=&filter[smoke]=&filter[drink]=&filter[english]=&filter[online]=this%20week&order=`;

                const response = await axios.get(url, {
                    headers: {
                        accept:
                            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                        'upgrade-insecure-requests': '1',
                    },
                    referrer: 'https://login.romancecompass.com/search/',
                    referrerPolicy: 'strict-origin-when-cross-origin',
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                });

                const html = response.data;
                const $ = cheerio.load(html);

                const usersElements = $('.gallery-item');

                usersElements.each((index, element) => {
                    const age = $(element).find('.age').text().trim();
                    const id = $(element).find('.name').attr('href').split('/')[4];
                    const userName = $(element).find('.name').text().trim();

                    const user = {
                        id: id,
                        userName: userName,
                        age: age,
                    };

                    usersData.push(user);
                });

                // Выход из цикла, если больше нет страниц или достигнут желаемый лимит пользователей
                if (usersData.length === 0) {
                    break;
                }

                if (currentPage % 25 === 0) {
                    setUsers((prevUsers) => [...prevUsers, ...usersData]);
                    usersData = [];
                }

                currentPage++;
            }
        };

        fetchData();
    }, []);

    return users;
};

export default GlobalUsers;
