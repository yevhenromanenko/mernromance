import CheckContentLetter from "../../check-content-letter/CheckContentLetter";
import ReplaceTagsLetter from "../../../replace-tags/ReplaceTagsLetter";
import LogLetter from "../../../../MassPage/logLetter/logLetter";
import CheckForForbiddenTags from "../../../checkForForbiddenTags";
import AddExcludedUserIdLetter from "../../add-excluded-user-id/AddExcludedUserIdLetter";
import SendLetter from "../../send-letter/SendLetter";
import CountOnlineLetterPost from "../count-online-letter/CountOnlineLetterPost";
import React from "react";
import GetRandomUser from "../../get-random-user/GetRandomUser";

const StartSendOnlineLetter = (combinedCounts, sendInterval, users, emailSubject, emailContent, selectedPhotoId, setIsSending, setSendInterval, allUsers, excludedUserIdsRef, excludedUserIds, log, setErr, setTodayCount, setLog) => {

    let checkIt = CheckContentLetter(emailSubject, emailContent, selectedPhotoId); // проверяем письмо на содержание темы, текста и фото

    if (typeof checkIt === 'undefined' || checkIt === false) {
        return;
    }
    setIsSending(true);

    setSendInterval(
        setInterval(async () => {
            console.log(combinedCounts, 'combinedCounts')

            if (combinedCounts >= 500) {
                console.log("Остановили рассылку писем , потому что отправлено больше 500 писем");
                setIsSending(false);
                clearInterval(sendInterval);
                return;
            }

            const randomUser = GetRandomUser(users, excludedUserIdsRef, allUsers, excludedUserIds);
            console.log(randomUser, 'randomUser online sending')

            if (randomUser === null) {
                return;
            }

            const replaceEmailSubject = await ReplaceTagsLetter(emailSubject, randomUser)
            const replaceEmailContent = await ReplaceTagsLetter(emailContent, randomUser)

            const logItem = (
                <LogLetter
                    letterSubject={replaceEmailSubject}
                    letterContent={replaceEmailContent}
                    randomUser={randomUser}
                    key={log.length}
                />
            );

            const hasForbiddenTags = CheckForForbiddenTags(replaceEmailSubject) || CheckForForbiddenTags(replaceEmailContent);

            if (hasForbiddenTags) {
                setErr(err => err + 1)
                console.log('Письмо содержит запрещенные теги. Начинаем заново рассылку');
                return;
            }

            try {
                await AddExcludedUserIdLetter(randomUser.id);
                await SendLetter(randomUser.id, selectedPhotoId, replaceEmailSubject, replaceEmailContent);
                const countLetters = await CountOnlineLetterPost();
                setTodayCount(countLetters);
                setLog((prevLog) => [...prevLog, logItem]); // выводим в лог
                excludedUserIdsRef.current.push(randomUser.id);

            } catch (error) {
                console.error('Error sending letter', error);
            }

        }, Math.floor(Math.random() * (70000 - 50000 + 1)  + 50000))
    );
};

export default StartSendOnlineLetter;
