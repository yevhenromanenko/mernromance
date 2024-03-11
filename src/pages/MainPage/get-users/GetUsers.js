import { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () =>  {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const url = 'https://login.romancecompass.com/chat/';
            const headers = {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded",
                "x-requested-with": "XMLHttpRequest"
            };
            const body = "ajax=1&action=get_online&page_num=1&clear_invited=0";
            const response = await axios.post(url, body, { headers, withCredentials: true });
            const data = response.data;
            const totalPages = data.pager.pages;
            let allUsers = Array.isArray(data.online) ? data.online : [];

            if (totalPages) {
                for (let i = 2; i <= totalPages; i++) {
                    await new Promise((resolve) => setTimeout(resolve, 250));
                    const nextPageResponse = await axios.post(url, `ajax=1&action=get_online&page_num=${i}&clear_invited=0`, { headers, withCredentials: true });
                    const nextPageData = nextPageResponse.data;
                    const nextPageUsers = Array.isArray(nextPageData.online) ? nextPageData.online : [];
                    allUsers = [...allUsers, ...nextPageUsers];
                }
            }

            setUsers(allUsers);
        }

        fetchUsers();

        // Обновляем список пользователей каждые 5 минут
        const intervalId = setInterval(() => {
            fetchUsers();
        }, 5 * 60 * 1000);

        // Очистка таймера при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

   return users;
}

export default UsersList;
