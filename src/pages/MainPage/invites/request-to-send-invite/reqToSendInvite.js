import React, { useState, useEffect } from 'react';
import '../invite-control/InviteControl.scss';
import InviteList from "../getInvites/GetInvites";
import FetchRequestCountInvite from "../fetch-request-count/FetchRequestCount";
import ExcludedUsersForLetter from "../../letters/excludedUsersForLetter/ExcludedUsersForLetter";
import GetPersonalInvites from "../get-personal-invite/GetPersonalInvites";
import StopBotAutoAnswer from "../stop-bot-auto-answer/StopBotAutoAnswer";
import WriteLetterAfterChat from "../write-letter-after-chat/WriteLetterAfterChat";
import StartSendingInvite from "../start-sending-invite/StartSendingInvite";
import StopSendingInvite from "../stop-sending-invite/StopSendingInvite";
// import PlaySong from "../auto-response/PlaySong";

const ReqToSendInvite = ({users}) => {
    const [now, setNow] = useState('0%');
    const [log, setLog] = useState([]);
    const [err, setErr] = useState(0)
    const [intervalId, setIntervalId] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [waitSeconds, setWaitSeconds] = useState(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [todayCount, setTodayCount] = useState(0);
    const [monthCount, setMonthCount] = useState(0);
    const [startElement, setStartElement] = useState(false);
    const [startChat, setStartChat] = useState(0)
    const [allUsers, setAllUsers] = useState([]);
    const [userId, setUserId] = useState(null); /// чекаем с каким пользователем начался чат

    const invites = InviteList();
    const personalInvites = GetPersonalInvites();
    let stopBot = false; // Флаг для остановки бота

    useEffect(() => {
        ExcludedUsersForLetter(setAllUsers);
    }, [])

    useEffect(() => {
        const handleUrlChange = () => {
            const url = window.location.href;
            const match = url.match(/\/#(\d+)$/);
            if (match) {
                const userId = match[1];
                setUserId(userId);
            }
        };

        handleUrlChange(); // Вызов функции для первоначальной установки значения userId

        window.addEventListener('hashchange', handleUrlChange); // Слушатель события изменения ссылки страницы

        return () => {
            window.removeEventListener('hashchange', handleUrlChange); // Очистка слушателя при размонтировании компонента
        };
    }, []);


    useEffect(() => {
        let countdownIntervalId;

        if (waitSeconds !== null) {
            countdownIntervalId = setInterval(() => {
                setWaitSeconds((prevSeconds) => {
                    if (prevSeconds <= 0) {
                        clearInterval(countdownIntervalId);
                        return null;
                    } else {
                        return prevSeconds - 1;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(countdownIntervalId);
    }, [waitSeconds]);

    useEffect(() => {
        FetchRequestCountInvite(setTodayCount, setMonthCount);
        // обновляем счетчик при изменении значения setTodayCount
        const percentage = Math.floor(todayCount / 80);
        setNow(`${percentage}%`);
    }, [todayCount]);

    // useEffect(() => {
    //     const handlePlaySong = async () => {
    //         if (playSong) {
    //             try {
    //                 await PlaySong();
    //             } catch (error) {
    //                 console.error('Ошибка воспроизведения песни:', error);
    //             }
    //         }
    //     };
    //
    //     handlePlaySong();
    // }, [playSong]);

    var stopBotExecution = function() {
        StopBotAutoAnswer(stopBot, setIsSending, intervalId, setIntervalId, setIsWaiting, setWaitSeconds);
    };

    var handleWriteMessage = function() {
        WriteLetterAfterChat(userId, setStartElement);
    };

    var startSendingMessages = function() {
        StartSendingInvite(setIsSending, setIsWaiting, setWaitSeconds,
            stopBot, setStartElement, setStartChat, users, invites, personalInvites,
            allUsers, setErr, isWaiting, setLog, setTodayCount, setIntervalId, log);
    };

    var stopSendingMessages = function() {
        StopSendingInvite(setIsSending, intervalId, setIntervalId, setIsWaiting, setWaitSeconds);
    };

    return (
            <div>
            {users.length === 0 && <p>Подождите пока загрузятся пользователи, которые в онлайне...</p>}
            {users.length > 0 && !isSending && <p>Можно начинать рассылку! Рассылка остановлена</p>}
            {users.length > 0 && isSending &&
            <p>
                Рассылка включена! Онлайн: {users.length} мужчин <br/>
                {waitSeconds !== null && (
                    <> На сайте осталось {waitSeconds} секунд</>
                )}
            </p>}
            {!isSending && <button className={'btn-start-invite waves-effect waves-light'} id="start-invite" disabled={users.length <= 0 || isSending} onClick={startSendingMessages}>Начать</button>}
            {isSending && <button className={'waves-effect waves-light btn-start-invite'} id="stop-invite" disabled={!isSending} onClick={stopSendingMessages}>Остановить</button>}

            <div className="progress-bar progress" style={{height: `8px`, width: "60%", margin: "10px 10px 10px 0"}}>
                <div className="determinate" style={{width: `${now}`, background: 'rgb(224, 159, 62)'}}>
                </div>
            </div>

            {startElement && (
                <div style={{ backgroundColor: '#e09f3e' }}>
                    <span>{`Напишите письмо пользователю ${userId}`}</span>
                    <button
                        className="waves-effect waves-light btn-start-invite"
                        id="write-message"
                        onClick={handleWriteMessage}
                    >
                        Написать
                    </button>
                </div>
            )}

            <div className="log">
                {log.map((message, index) => (
                    <div key={index}>{message}</div>
                )).reverse()}
            </div>
            <p style={{margin: "0 auto 10px 0"}}>Отправлено сегодня: <span style={{color: '#e09f3e'}}>{todayCount}</span> - {now} от нормы 8000, ошибки: <span style={{color: '#e09f3e'}}>{err}</span></p>
            <p style={{margin: "0 auto 10px 0"}}>Отправлено за последние 30 дней: <span style={{color: '#e09f3e'}}>{monthCount}</span>, Чатов сегодня: <span style={{color: '#e09f3e'}}>{startChat}</span></p>

            {startElement && (
                <div style={{backgroundColor: '#e09f3e'}}>
                    <span>Начался чат с пользователем, работает бот-автоответчик, нажмите, чтобы продолжить вручную чат</span>
                    <button className={'waves-effect waves-light btn-start-invite'} id="start-chat" onClick={stopBotExecution}>
                        Начать чат
                    </button>
                </div>

            )}
            </div>
    );
}

export default ReqToSendInvite;
