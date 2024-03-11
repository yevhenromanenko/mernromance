import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../MassLetters.scss'

const LogLetter = ({ letterSubject, letterContent, randomUser }) => {
    const nullPhoto = 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png'

    const [photoDeda, setPhotoDeda] = useState('');
    const [country, setCountry] = useState('');
    const [userNotFound, setUserNotFound] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://login.romancecompass.com/man/${randomUser.id}/`, {
                headers: {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "cache-control": "max-age=0",
                    "upgrade-insecure-requests": "1"
                },
                referrer: "https://login.romancecompass.com/chat/",
                referrerPolicy: "strict-origin-when-cross-origin",
                method: "GET",
                mode: "cors",
                credentials: "include"
            });

            const data = response.data;

            const regex = /<img src="\/media\/profilephoto\/000\d+\/([a-z0-9]+\.jpg)/i;
            const match = data.match(regex);

            let fileName = null;
            if (match && match.length > 1) {
                fileName = match[1];
            }

            const regexCountry = /<div class="param selected">Residence: <span>([^<]+)<\/span><\/div>/i;
            const matchCountry = data.match(regexCountry);

            let country = null;
            if (matchCountry && matchCountry.length > 1) {
                country = matchCountry[1];
            }

            if (fileName === null) {
                setPhotoDeda(nullPhoto);
            } else {
                setPhotoDeda(`https://login.romancecompass.com/media/profilephoto/000${randomUser.id}/${fileName}`);
            }

            setCountry(country);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setUserNotFound(true); // Устанавливаем состояние "Пользователь не найден"
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [randomUser.id]);

    if (userNotFound) {
        return (
            <div className="__row">
                <div className="img_in_log">
                    <img src={nullPhoto} className="ava_in_log" alt="" />
                </div>
                <div className="msg_in_log">Пользователь не найден!</div>
            </div>
        )
    }

    return (
        <div className="__row">
            <div className="img_in_log_letter">
                <img src={photoDeda} className="ava_in_log_letter" alt="" />
            </div>
            <div className="msg_in_log_letter">
                <div className="invite_text_in_log_letter"><span style={{color: '#e09f3e'}}>Тема: </span>{letterSubject.slice(0, 35)}...</div>
                <div className="invite_text_in_log_letter"><span style={{color: '#e09f3e'}}>Письмо: </span>{letterContent.slice(0, 50)}...</div>
                <div className="invite_info_in_log_letter">
                    {randomUser.name} -{' '}
                    <a href={`https://login.romancecompass.com/man/${randomUser.id}/`} target="_blank" rel="noopener noreferrer" className="ded_id_in_log">
                        {randomUser.id}
                    </a>
                    <span className="country_in_log"> {country}</span>
                </div>
            </div>
        </div>
    );
};

export default LogLetter;
