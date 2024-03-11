import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailNotifications = () => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [letterId, setLetterId] = useState('');

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const response = await axios.post(
                    'https://login.romancecompass.com/letters/',
                    'route=inbox&ajax=1',
                    {
                        headers: {
                            accept: 'text/html, */*; q=0.01',
                            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                            'content-type': 'application/x-www-form-urlencoded',
                            'x-requested-with': 'XMLHttpRequest',
                        },
                        referrer: 'https://login.romancecompass.com/letters/',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        mode: 'cors',
                        credentials: 'include',
                    }
                );

                const parser = new DOMParser();
                const htmlDocument = parser.parseFromString(response.data, 'text/html');

                const unansweredElements = htmlDocument.querySelectorAll('.unanswered');

                if (unansweredElements.length > 0) {
                    setUnreadCount(unansweredElements.length);

                    const firstUnansweredElement = unansweredElements[0];
                    const idMatch = firstUnansweredElement.id.match(/\d+/);
                    if (idMatch) {
                        setLetterId(idMatch[0]);
                    }
                } else {
                    setUnreadCount(0);
                    setLetterId('');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUnreadCount();
    }, []);

    if (unreadCount === 0) {
        return null; // Возвращаем null, если нет непрочитанных писем
    }

    return (
        <div>
            <p style={{backgroundColor: '#e09f3e'}}>Входящее письмо: {unreadCount}
            <a href={`https://login.romancecompass.com/letters/#inbox/read${letterId}`} target="_blank" rel="noopener noreferrer" style={{marginLeft: '10px', color: '#851919'}}>
                Ответить
            </a>
            </p>
        </div>
    );
};

export default EmailNotifications;
