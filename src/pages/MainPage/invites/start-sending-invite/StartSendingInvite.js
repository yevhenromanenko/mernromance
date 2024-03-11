import CheckForNewMessages from "../auto-response/AutoResponse";
import ReplaceTags from "../../replace-tags/ReplaceTags";
import LogItem from "../log/Log";
import CheckForForbiddenTags from "../../checkForForbiddenTags";
import SendMessage from "../req-to-send-message/SendMessage";
import CountInvites from "../count-invites/CountInvites";
import ReqToSendInterest from "../../req-to-send-interest/ReqToSendInterest";
import React from "react";

const StartSendingInvite = async (setIsSending, setIsWaiting, setWaitSeconds,
                                  stopBot, setStartElement, setStartChat, users, invites, personalInvites,
                                  allUsers, setErr, isWaiting, setLog, setTodayCount, setIntervalId, log) => {

    let dedGetAutoAnswer = ['999'];
    let usersWithSentMessage = [];


    if (invites.length === 0) {
        alert("Додайте хоча б один інвайт для розсилки!");
        return;
    }

    if (personalInvites.length === 0) {
        alert("Додайте хоча б один персональний інвайт для розсилки своїм постояльцям!");
        return;
    }


    setIsSending(true);

    const id = setInterval(async () => {
        await CheckForNewMessages(setIsWaiting, setWaitSeconds, dedGetAutoAnswer, stopBot, setStartElement, setStartChat, usersWithSentMessage); // автоответ, чекаем есть ли входящее сообщение и отправляем Hi dear

        const randomUser = users[Math.floor(Math.random() * users.length)];

        const randomInvite = invites[Math.floor(Math.random() * invites.length)];
        const inviteToSend = ReplaceTags(randomInvite, randomUser);

        const randomPersonalInvite = personalInvites[Math.floor(Math.random() * personalInvites.length)];
        const personalInviteToSend = ReplaceTags(randomPersonalInvite, randomUser);

        const userExists = allUsers.some(user => user.id === randomUser.id);

        const logItem = (
            <LogItem
                personalInviteToSend={personalInviteToSend}
                userExists={userExists}
                inviteToSend={inviteToSend}
                randomUser={randomUser}
                key={log.length}
            />
        );

        if (CheckForForbiddenTags(inviteToSend)) {
            setErr(err => err + 1) // выводим ошибку
            console.log('inviteToSend содержит запрещенные теги, начинаем рассылку заново');
            clearInterval(id); // Остановка текущего setInterval
            StartSendingInvite(setIsSending, setIsWaiting, setWaitSeconds, stopBot, setStartElement, setStartChat, users, invites, personalInvites, allUsers, setErr, isWaiting, setLog, setTodayCount, setIntervalId, log); // Вызов функции для начала рассылки заново
        } else {
            if (userExists) {
                if (!isWaiting) {
                    setLog((prevLog) => [...prevLog, logItem]); // выводим в лог
                    await SendMessage(randomUser.id, personalInviteToSend, setIsWaiting, setWaitSeconds); // отправляем инвайт
                    const countInvites = await CountInvites(); // отправляем кол-во отправленных инвайтов на сервера
                    setTodayCount(countInvites);  // записываем кол-во отправленных инвайтов
                }
            } else {
                if (!isWaiting) {
                    setLog((prevLog) => [...prevLog, logItem]); // выводим в лог
                    await SendMessage(randomUser.id, inviteToSend, setIsWaiting, setWaitSeconds); // отправляем инвайт
                    await ReqToSendInterest(randomUser.id);  // отправляем интерес
                    const countInvites = await CountInvites(); // отправляем кол-во отправленных инвайтов на сервера
                    setTodayCount(countInvites);  // записываем кол-во отправленных инвайтов
                }
            }
        }
    }, Math.floor(Math.random() * (7000 - 5000 + 1) + 5000));

    setIntervalId(id);
};

export default StartSendingInvite;
