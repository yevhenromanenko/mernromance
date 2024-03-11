import ReplaceTagsLetter from "../../../replace-tags/ReplaceTagsLetter";
import LogLetter from "../../../../MassPage/logLetter/logLetter";
import CheckForForbiddenTags from "../../../checkForForbiddenTags";
import AddExcludedUserIdLetter from "../../add-excluded-user-id/AddExcludedUserIdLetter";
import SendLetter from "../../send-letter/SendLetter";
import React from "react";
import CountGlobalLetters from "../count-global-letter/CountGlobalLetterPost";
import GetInfoUser from "../get-info-user/GetInfoUser";
import CheckContentLetter from "../../check-content-letter/CheckContentLetter";
import GetRandomUser from "../../get-random-user/GetRandomUser";

const StartSendGlobalLetter = (combinedCounts, sendIntervalGlobalLetter, globalUsers, globalLetterSubject, globalLetterContent, selectedPhotoIdForGlobalLetter, setIsSendingGlobalLetter, setSendIntervalGlobalLetter, allUsers, excludedUserIdsRef, excludedUserIds, logGlobalLetter, setErrGlobalLetter, setTodayCountGlobalLetter, setLogGlobalLetter) => {

    let checkIt = CheckContentLetter(globalLetterSubject, globalLetterContent, selectedPhotoIdForGlobalLetter); // проверяем письмо на содержание темы, текста и фото
    if (typeof checkIt === 'undefined' || checkIt === false) {
        return;
    }

    setIsSendingGlobalLetter(true);

    setSendIntervalGlobalLetter(
        setInterval(async () => {
            console.log(combinedCounts, 'combinedCounts')

            if (combinedCounts >= 500) {
                console.log("Остановили рассылку писем , потому что отправлено больше 500 писем");
                setIsSendingGlobalLetter(false);
                clearInterval(sendIntervalGlobalLetter);
                return;
            }

            const randomUser = GetRandomUser(globalUsers, excludedUserIdsRef, allUsers, excludedUserIds);
            console.log(randomUser, 'randomUser global sending')

            if (randomUser === null) {
                return;
            }

            const user = await GetInfoUser(randomUser.id);

            const replaceEmailSubject = await ReplaceTagsLetter(globalLetterSubject, user)
            const replaceEmailContent = await ReplaceTagsLetter(globalLetterContent, user)

            const logItem = (
                <LogLetter
                    letterSubject={replaceEmailSubject}
                    letterContent={replaceEmailContent}
                    randomUser={randomUser}
                    key={logGlobalLetter.length}
                />
            );

            const hasForbiddenTags = CheckForForbiddenTags(replaceEmailSubject) || CheckForForbiddenTags(replaceEmailContent);

            if (hasForbiddenTags) {
                setErrGlobalLetter(err => err + 1)
                console.log('Письмо содержит запрещенные теги. Начинаем заново рассылку');
                return;
            }

            try {
                await AddExcludedUserIdLetter(randomUser.id);
                await SendLetter(randomUser.id, selectedPhotoIdForGlobalLetter, replaceEmailSubject, replaceEmailContent);
                const countLetters = await CountGlobalLetters();
                setTodayCountGlobalLetter(countLetters);
                setLogGlobalLetter((prevLog) => [...prevLog, logItem]); // выводим в лог
                excludedUserIdsRef.current.push(randomUser.id);

            } catch (error) {
                console.error('Ошибка отправки письма', error);
            }

        }, Math.floor(Math.random() * (50000 - 30000 + 1)  + 30000))
    )
};


export default StartSendGlobalLetter;
