import './MassLetters.scss'
import React, {useEffect, useState} from "react";
import PhotoGallery from "../MainPage/letters/photo-gallery/PhotoGallery";
import SendLetter from "../MainPage/letters/send-letter/SendLetter";
import axios from "axios";
import LogLetter from "./logLetter/logLetter";
import ActualMassLetter from "./actualMassLetter/ActualMassLetter";
import ExcludedUsersForLetter from "../MainPage/letters/excludedUsersForLetter/ExcludedUsersForLetter";
import {SERVER_NAME} from "../../server_name";

const MassLetters = () => {
    const [userCount, setUserCount] = useState(0);
    const [showUserList, setShowUserList] = useState(false);
    const [manualUserId, setManualUserId] = useState(""); // Добавленное поле для ввода ID пользователя

    const [letterSubject, setLetterSubject] = useState("");
    const [letterContent, setLetterContent] = useState("");
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [isPhotoGalleryVisible, setIsPhotoGalleryVisible] = useState(false);
    const [err, setErr] = useState(0);
    const [sentCount, setSentCount] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedPhotoCount, setSelectedPhotoCount] = useState(0);
    const [allData, setAllData] = useState([]); // Обновленное состояние для всех данных
    const [log, setLog] = useState([]);
    const [ladyId, setLadyId] = useState("");

    const toggleUserList = () => {
        setShowUserList(!showUserList);
    };

    const handleSubjectChange = (event) => {
        setLetterSubject(event.target.value);
    };

    const handleContentChange = (event) => {
        setLetterContent(event.target.value);
    };

    const handleManualUserIdChange = (event) => {
        setManualUserId(event.target.value);
    };

    const addManualUser = async () => {

        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const ladyId = match ? match[1] : null;

        if (!manualUserId) {
            alert('Такого пользователя не существет')
            return;
        }

        try {
            const response = await axios.get(`https://login.romancecompass.com/man/${manualUserId}/`, {
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
            })

            const data = response.data;

            const regex = /<span itemprop="title">PROFILE ([^<]+) USER ID: (\d+)<\/span>/;
            const match = data.match(regex);

            if (match) {
                const name = match[1];
                const id = match[2];

                const existingData = allData.find((item) => item.id === id);

                if (!existingData) {
                    const res = await axios.post(`https://${SERVER_NAME}/usersMassLetter`, { id: id, name: name, ladyId: ladyId }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (res.status === 201) {
                    setAllData((prevData) => [...prevData, { id: id, name: name }]);
                    setUserCount((prevCount) => prevCount + 1);
                    setManualUserId("");
                 }
                }
            }

        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    const removeUser = async (id) => {
        try {
            const response = await axios.delete(`https://${SERVER_NAME}/usersMassLetter?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Удаление пользователя на клиентской стороне
                setAllData((prevData) => prevData.filter((item) => item.id !== id));
                setUserCount((prevCount) => prevCount - 1);
            }
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    const togglePhotoGallery = () => {
        setIsPhotoGalleryVisible(!isPhotoGalleryVisible);
    };

    const addNameForSubject = () => {
        setLetterSubject((prevSubject) => prevSubject + "%firstName%");
    };

    const addNameForContent = () => {
        setLetterContent((prevContent) => prevContent + "%firstName%");
    };

    useEffect(() => {
        ExcludedUsersForLetter(setAllData);
        setUserCount(allData.length);

    }, [allData]);

    useEffect(() => {
        const fetchLadyId = async () => {
            try {
                const res = await axios.get('https://login.romancecompass.com/chat/')
                const html = res.data;
                const match = html.match(/<b>(\d+)<\/b>/);
                const newId = match ? match[1] : null;
                setLadyId(newId);
            } catch (error) {
                console.error("Error adding invite to server:", error);
            }
        }
        fetchLadyId();
    }, [])

    const startSendMassLetter = async () => {
        if (letterSubject.length < 5) {
            alert('Тема слишком короткая');
            return;
        }

        if (letterContent.length < 200) {
            alert('Письмо слишком короткое');
            return;
        }

        if (!selectedPhotoId) {
            if (ladyId === "474010") {
                setSelectedPhotoId("1848380")
            } else if (ladyId === '474885') {
                setSelectedPhotoId("2113013")
            } else {
                alert('Добавьте 1 фото к письму');
                return;
            }
        }

        setIsSending(true);

        for (const userData of allData) {

            await new Promise((resolve) => setTimeout(resolve, getRandomDelay()));
            const userId = userData.id;
            // if (userId === '37065') {
            //     console.log('Денису не отправляем')
            //     return;
            // }
            const userName = userData.name;
            let fullName = userName.toString();
            let [firstName] = fullName.split(' ', 1);
            let firstRightName = firstName[0].toUpperCase() + firstName.slice(1);

            // Замена тега %firstName% на userName
            let replaceEmailSubject = letterSubject.replace('%firstName%', firstRightName);
            let replaceEmailContent = letterContent.replace('%firstName%', firstRightName);

            if (replaceEmailSubject.includes("&Ouml;")) {
                // Замена символа на "O"
                replaceEmailSubject = replaceEmailSubject.replace(/&Ouml;/g, "O");
            }

            if (replaceEmailContent.includes("&Ouml;")) {
                // Замена символа на "O"
                replaceEmailContent = replaceEmailContent.replace(/&Ouml;/g, "O");
            }

            const logItem = (
                <LogLetter
                    letterSubject={replaceEmailSubject}
                    letterContent={replaceEmailContent}
                    randomUser={userData}
                    key={log.length}
                />
            );


            if (replaceEmailSubject.includes('%firstName%') || replaceEmailContent.includes('%firstName%')) {
                setErr((prevErr) => prevErr + 1);
                console.log('Письмо содержит запрещенные теги. Начинаем заново рассылку');
                return;
            }
                setLog((prevLog) => [...prevLog, logItem]); // выводим в лог
                await SendLetter(userId, selectedPhotoId, replaceEmailSubject, replaceEmailContent);
                setSentCount((prevCount) => prevCount + 1); // Увеличиваем счетчик отправленных писем
        }

        sendSendingDateToServer(new Date());
        setIsFinished(true);
    };


        const sendSendingDateToServer = async (date) => {
            try {
                const res = await axios.get('https://login.romancecompass.com/chat/')
                const html = res.data;
                const match = html.match(/<b>(\d+)<\/b>/);
                const idLady = match ? match[1] : null;

                await axios.post(
                    `https://${SERVER_NAME}/lastSentDate`,
                    {
                        id: idLady,
                        date: date,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } catch (error) {
                console.error('Произошла ошибка:', error);
            }

        };

    const { outdated, color, lastDate, diffDays } = ActualMassLetter();

    const getRandomDelay = () => {
        const minDelay = 5000; // 15 seconds
        const maxDelay = 15000; // 30 seconds
        return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    };


    return (
    <>
        <div style={{marginLeft: '10px', marginTop: '10px'}}>
            <>
                <span style={{color: 'white', fontSize: '16px'}}>Найдено мужчин: { userCount }</span>
                <button className={'waves-effect waves-light btn-open-users'} onClick={toggleUserList}>
                    {showUserList ? 'Скрыть ⬆' : 'Показать ⬇'}
                </button>
                <span style={{marginLeft: '10px', color: 'white', fontSize: '14px'}}>Здесь отображаются мужчины, которые вам писали когда-либо письма! Так же, вы можете добавить мужчину вручную! ⇨</span>
                {/*Добавленное поле для ввода ID пользователя*/}
                <div className={'add-user-input'}>
                    <textarea
                        type={"text"}
                        value={manualUserId}
                        className={'form-control add-inp'}
                        onChange={handleManualUserIdChange}
                        placeholder={'Введите ID'}
                    />
                    <button onClick={addManualUser} className="btn-outline-light add-new-user">Добавить</button>
                </div>
            </><br/>
            <p>
                {showUserList && (
                    <>
                        {allData.map((item) => (
                            <>
                                <a
                                    href={`https://login.romancecompass.com/man/${item.id}`}
                                    style={{ color: sentCount > 0 && item.id <= sentCount ? "red" : "inherit" }}
                                >
                                    {item.id}
                                </a>
                                : {item.name}
                                <i style={{backgroundColor: '#3D5A80', marginLeft: '5px', marginRight: '10px'}} className="tiny material-icons" onClick={() => removeUser(item.id)}>delete_forever;</i>
                            </>
                        ))}
                    </>
                )}
            </p>
        </div>
        <div>
            <div className="mass-form">
                <div className={'log_mass_letter'}>
                    {log.map((message, index) => (
                        <div key={index}>{message}</div>
                    )).reverse()}
                </div>
                <p style={{ color }}>
                        {
                        lastDate === '01.01.1970' ?
                            <p style={{fontSize: '12px', border: 'solid red', padding: '5px', width: '40%'}}>Вы еще никогда не делали массовую рассылку! Заполните ниже поля и прикрепите 1 фото!</p> :
                        outdated ?
                            `Вы на верном пути, потому что массовая рассылка не делалась уже ${diffDays} дней!` :
                            `Рассылка актуальна! Последняя рассылка была ${lastDate}!`
                        }
                </p>
                <div>
                    <label className={'label-class'} htmlFor="subject">Тема письма:</label><br/>
                    <button className={'waves-effect waves-light btn-open-users'} onClick={addNameForSubject}>Имя</button><br/>
                    <textarea
                        id="subject"
                        className={'subject-letter'}
                        placeholder={"Напишите тему письма"}
                        name="subject"
                        value={letterSubject}
                        onChange={handleSubjectChange}
                    />
                </div>
                <div>
                    <label className={'label-class'} htmlFor="content">Текст письма:</label><br/>
                    <button  className={'waves-effect waves-light btn-open-users'} onClick={addNameForContent}>Имя</button>
                    <span style={{fontSize: '12px', color: "white"}}>Тег вставляется в конец письма, переместить его куда вам нужно!</span>
                    <br/>
                    <textarea
                        id="content"
                        className={'content-letter'}
                        placeholder={'Напишите письмо для рассылки'}
                        name="content"
                        value={letterContent}
                        onChange={handleContentChange}
                    />
                </div>
                <div>
                    <button className={'waves-effect waves-light btn-save-letter'} onClick={togglePhotoGallery}>
                        {!isPhotoGalleryVisible ? `Фото: ${selectedPhotoCount} ⬇` : `Фото: ${selectedPhotoCount} ⬆`}
                    </button>
                    <button
                        className={'waves-effect waves-light btn-save-letter'}
                        onClick={startSendMassLetter} style={{marginLeft: '120px'}}
                        disabled={isSending || allData.length === 0 || isFinished}
                    >
                        {isFinished ? 'Рассылка закончена' : (isSending ? 'Отправка...' : 'Начать рассылку')}
                    </button>
                    <p>Отправлено: {sentCount} / {userCount}, ошибки: {err}</p>
                    {isPhotoGalleryVisible && (
                        <PhotoGallery setSelectedPhotoId={setSelectedPhotoId} setSelectedPhotoCount={setSelectedPhotoCount} />
                    )}

                </div>
            </div>
        </div>
    </>
    );
};

export default MassLetters;
