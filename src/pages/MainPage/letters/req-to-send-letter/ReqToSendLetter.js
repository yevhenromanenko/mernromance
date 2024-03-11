import React, {useEffect, useRef, useState} from "react";

import './ReqToSendLetter.scss'

import ExcludedUsersForLetter from "../excludedUsersForLetter/ExcludedUsersForLetter";
import LetterFromServer from "../online-letter/letter-from-server/LetterFromServer";
import FetchExcludedUserIdsToday from "../fetch-excluded-user-ids-today/fetchExcludedUserIdsToday";
import GlobalUsers from "../global-letter/requests/GlobalUsers";
import OnlineLetter from "../online-letter/render-spam-letter-for-online/OnlineLetter";
import GlobalLetterFromServer from "../global-letter/global-letter-from-server/GlobalLetterFromServer";
import StartSendGlobalLetter from "../global-letter/start-send-global-letter/StartSendGlobalLetter";
import StopSendGlobalLetter from "../global-letter/stop-send-global-letter/StopSendGlobalLetter";
import GlobalLetter from "../global-letter/render-spam-letter-for-global/GlobalLetter";
import FetchRequestCountLetters from "../online-letter/count-online-letter/CountOnlineLetterGet";
import FetchRequestCountGlobalLetters from "../global-letter/count-global-letter/CountGlobalLetterGet";
import StartSendOnlineLetter from "../online-letter/start-send-online-letter/StartSendOnlineLetter";
import StopSendOnlineLetter from "../online-letter/stop-send-online-letter/StopSendOnlineLetter";

const ReqToSendLetter = ({users}) => {

    const [emailSubject, setEmailSubject] = useState("");
    const [globalLetterSubject, setGlobalLetterSubject] = useState("");

    const [emailContent, setEmailContent] = useState("");
    const [globalLetterContent, setGlobalLetterContent] = useState("");

    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [selectedPhotoIdForGlobalLetter, setSelectedPhotoIdForGlobalLetter] = useState(null);

    const [isEmailFormVisible, setIsEmailFormVisible] = useState(true);
    const [isGlobalLetterFormVisible, setIsGlobalLetterFormVisible] = useState(true);

    const [isSending, setIsSending] = useState(false);
    const [isSendingGlobalLetter, setIsSendingGlobalLetter] = useState(false);

    const [sendInterval, setSendInterval] = useState(null);
    const [sendIntervalGlobalLetter, setSendIntervalGlobalLetter] = useState(null);

    const [err, setErr] = useState(0)
    const [errGlobalLetter, setErrGlobalLetter] = useState(0)

    const [selectedPhotoCount, setSelectedPhotoCount] = useState(0);
    const [selectedPhotoCountGlobalLetter, setSelectedPhotoCountGlobalLetter] = useState(0);

    const [todayCount, setTodayCount] = useState(0);
    const [todayCountGlobalLetter, setTodayCountGlobalLetter] = useState(0);
    const [combinedCounts, setCombinedCounts] = useState(0);

    const [monthCount, setMonthCount] = useState(0);
    const [monthCountGlobalLetter, setMonthCountGlobalLetter] = useState(0);

    const [now, setNow] = useState('0%');
    const [nowGlobalLetter, setNowGlobalLetter] = useState('0%');

    const [log, setLog] = useState([]);
    const [logGlobalLetter, setLogGlobalLetter] = useState([]);

    const [allUsers, setAllUsers] = useState([]);
    const [excludedUserIds, setExcludedUserIds] = useState([]);
    const excludedUserIdsRef = useRef([]);

    const globalUsers = GlobalUsers();

    useEffect(() => {
        ExcludedUsersForLetter(setAllUsers);
        LetterFromServer(setEmailSubject, setEmailContent, setSelectedPhotoId);
        GlobalLetterFromServer(setGlobalLetterSubject, setGlobalLetterContent, setSelectedPhotoIdForGlobalLetter);
        FetchExcludedUserIdsToday(setExcludedUserIds);
    }, []);

    useEffect(() => {
        FetchRequestCountLetters(setTodayCount, setMonthCount);
        // обновляем счетчик при изменении значения setTodayCount
        const percentage = Math.floor(todayCount / 5);
        setNow(`${percentage}%`);
    }, [todayCount]);

    useEffect(() => {
        FetchRequestCountGlobalLetters(setTodayCountGlobalLetter, setMonthCountGlobalLetter);
        // обновляем счетчик при изменении значения setTodayCount
        const percentage = Math.floor(todayCountGlobalLetter / 5);
        setNowGlobalLetter(`${percentage}%`);
    }, [todayCountGlobalLetter]);

    useEffect(() => {
        const combinedTodayCounts = todayCountGlobalLetter + todayCount;
        setCombinedCounts(combinedTodayCounts);
    }, [todayCountGlobalLetter, todayCount]);


    const toggleEmailForm = () => {
        setIsEmailFormVisible(!isEmailFormVisible);
    };

    const toggleGlobalLetterForm = () => {
        setIsGlobalLetterFormVisible(!isGlobalLetterFormVisible);
    };

    var startSendLetter = function() {
        StartSendOnlineLetter(combinedCounts, sendInterval, users, emailSubject, emailContent, selectedPhotoId, setIsSending, setSendInterval, allUsers, excludedUserIdsRef, excludedUserIds, log, setErr, setTodayCount, setLog);
    };

    var stopSendLetter = function() {
        StopSendOnlineLetter(setIsSending, sendInterval);
    };

    var startSendingGlobalLetter = function() {
        StartSendGlobalLetter(combinedCounts, sendIntervalGlobalLetter, globalUsers, globalLetterSubject, globalLetterContent, selectedPhotoIdForGlobalLetter, setIsSendingGlobalLetter, setSendIntervalGlobalLetter, allUsers, excludedUserIdsRef, excludedUserIds, logGlobalLetter, setErrGlobalLetter, setTodayCountGlobalLetter, setLogGlobalLetter);
    };

    var stopSendingGlobalLetter = function() {
        StopSendGlobalLetter(setIsSendingGlobalLetter, sendIntervalGlobalLetter);
    };

    return (
        <>
            <div className={"row"}>
                <div className={'column'}>
                    {users.length === 0 && <p style={{marginLeft: '10px', marginTop: '0px'}}>Подождите пока загрузятся пользователи, которые в онлайне...</p>}
                    {users.length > 0 && !isSending && <p style={{marginLeft: '10px', marginTop: '0px'}}>Можно начинать рассылку! Рассылка остановлена</p>}
                    {users.length > 0 && isSending &&
                    <p style={{marginLeft: '10px', marginTop: '0px'}}>
                        Рассылка включена!<br/>
                    </p>}
                    <button className={'waves-effect waves-light btn-save-letter'} onClick={toggleEmailForm} style={{marginLeft: '10px', marginBottom: '10px'}}>
                        {!isEmailFormVisible ? "Скрыть ⬆" : "Онлайн рассылка ⬇"}
                    </button>
                    {!isSending && <button className={'waves-effect waves-light btn-save-letter'} onClick={startSendLetter} disabled={users.length <= 0 || isSending} style={{marginLeft: '70px', marginBottom: '10px'}}>Начать</button>}
                    {isSending && <button className={'waves-effect waves-light btn-save-letter'} onClick={stopSendLetter} disabled={!isSending} style={{marginLeft: '3px', marginBottom: '10px'}}>Остановить</button>}
                    <p style={{margin: "0 0px 0 10px"}}>Отправлено писем сегодня: <span style={{color: '#e09f3e'}}>{todayCount}</span> - {now} от нормы 500, ошибки: {err}</p>
                    <p style={{margin: "0 0px 0 10px"}}>Отправлено писем за месяц: <span style={{color: '#e09f3e'}}>{monthCount}</span> </p>
                </div>

                <div className={'column'}>
                    {globalUsers.length === 0 && <p style={{marginLeft: '10px', marginTop: '0px'}}>Подождите пока загрузятся пользователи...</p>}
                    {globalUsers.length > 0 && !isSendingGlobalLetter && <p style={{marginLeft: '10px', marginTop: '0px'}}>Можно начинать глобальную рассылку!</p>}
                    {globalUsers.length > 0 && isSendingGlobalLetter &&
                    <p style={{marginLeft: '10px', marginTop: '0px'}}>
                        Глобальная рассылка включена! Найдено пользователей: {globalUsers.length}<br/>
                    </p>}
                    <button className={'waves-effect waves-light btn-save-letter'} onClick={toggleGlobalLetterForm} style={{marginLeft: '10px', marginBottom: '10px'}}>
                        {!isGlobalLetterFormVisible ? "Скрыть ⬆" : "Глобальная рассылка ⬇"}
                    </button>
                    {!isSendingGlobalLetter && <button className={'waves-effect waves-light btn-save-letter'} onClick={startSendingGlobalLetter} disabled={globalUsers.length <= 0 || isSendingGlobalLetter} style={{marginLeft: '70px', marginBottom: '10px'}}>Начать</button>}
                    {isSendingGlobalLetter && <button className={'waves-effect waves-light btn-save-letter'} onClick={stopSendingGlobalLetter} disabled={!isSendingGlobalLetter} style={{marginLeft: '3px', marginBottom: '10px'}}>Остановить</button>}
                    <p style={{margin: "0 0px 0 10px"}}>Отправлено писем сегодня: <span style={{color: '#e09f3e'}}>{todayCountGlobalLetter}</span> - {nowGlobalLetter} от нормы 500, ошибки: {errGlobalLetter}</p>
                    <p style={{margin: "0 0px 0 10px"}}>Отправлено писем за месяц: <span style={{color: '#e09f3e'}}>{monthCountGlobalLetter}</span> </p>
                </div>
            </div>

            {/*render global letter */}
            {!isGlobalLetterFormVisible &&
            <GlobalLetter
                globalUsers={globalUsers}
                logGlobalLetter={logGlobalLetter}
                setGlobalLetterSubject={setGlobalLetterSubject}
                globalLetterSubject={globalLetterSubject}
                setGlobalLetterContent={setGlobalLetterContent}
                globalLetterContent={globalLetterContent}
                selectedPhotoCountGlobalLetter={selectedPhotoCountGlobalLetter}
                setSelectedPhotoCountGlobalLetter={setSelectedPhotoCountGlobalLetter}
                selectedPhotoIdForGlobalLetter={selectedPhotoIdForGlobalLetter}
                setSelectedPhotoIdForGlobalLetter={setSelectedPhotoIdForGlobalLetter}/>
            }

            {/*render online letter */}
            {!isEmailFormVisible &&
            <OnlineLetter
                users={users}
                log={log}
                setEmailSubject={setEmailSubject}
                emailSubject={emailSubject}
                setEmailContent={setEmailContent}
                emailContent={emailContent}
                selectedPhotoCount={selectedPhotoCount}
                setSelectedPhotoId={setSelectedPhotoId}
                setSelectedPhotoCount={setSelectedPhotoCount}
                selectedPhotoId={selectedPhotoId}/>
            }
        </>
        );
    };

export default ReqToSendLetter;


