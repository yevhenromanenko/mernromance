import SendMessage from "../req-to-send-message/SendMessage";

const CheckForNewMessages = async (setIsWaiting, setWaitSeconds, dedGetAutoAnswer, stopBot, setStartElement, setStartChat, usersWithSentMessage) => {

    const inviteToSend = 'Hi dear!';
    const inviteIgnored = 'Why are you ignoring me?'

    const chatDivs = document.querySelectorAll('.newmsg');
    console.log(chatDivs, 'chatDivs newmsg')
    // const startedElement = document.querySelector('.me');
    // console.log(startedElement, 'класс me');

    if (chatDivs.length > 0) {
        for (const div of chatDivs) {
            const span = div.querySelector('.cnt');
            console.log(span, 'span cnt');
            if (span.innerText === '1') {
                const userId = div.id.split('-')[2];
                const link = `https://login.romancecompass.com/chat/#${userId}`;
                window.location.href = link;
                console.log(userId, 'userId 1')
                await new Promise((resolve) => setTimeout(resolve, 500));

                const ignoredFound = Array.from(document.querySelectorAll('.chat-message-text')).some(chatMessageDiv => chatMessageDiv.textContent.includes('ignored'));
                await new Promise((resolve) => setTimeout(resolve, 500));

                console.log('ignoredFound', ignoredFound)
                // Выводим сообщение в консоль, если слово найдено хотя бы в одном элементе.

                if (ignoredFound) {
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    console.log("Пользователь игнорирует, отправляем ему сообщение чо игноршь?");
                    await SendMessage(userId, inviteIgnored, setIsWaiting, setWaitSeconds);
                    console.log(`Пользователь ${userId} получил ${inviteIgnored}`);
                }
            }
        }
    }

    // if (chatDivs) {
    //     chatDivs.forEach( (div) => {
    //         const span = div.querySelector('.cnt');
    //         console.log(span, 'span cnt')
    //         if (span.innerText === '1') {
    //             userId = div.id.split('-')[2];
    //             const link = `https://login.romancecompass.com/chat/#${userId}`;
    //             window.location.href = link;
    //         }
    //     })
    //
    // }

    // const startedElement = document.querySelector('.started');
    const startedElement = document.querySelector('.me');
    console.log(startedElement, 'startedElement me')
    //const startedElement = document.querySelector('.newmsg');


    if (startedElement !== null && !stopBot) {
        console.log('here')

        setStartElement(true);
        console.log('here 1')

        const startedElementId = document.querySelector('.started');
        const id = startedElementId.id;
        const userIdMatch = id.match(/chat-contact-(\d+)/);

        if (userIdMatch) {
            const userId = userIdMatch[1];

            if (dedGetAutoAnswer.includes(userId)) {
                console.log(`Пользователь ${userId} уже получил сообщение. Продолжаем анализировать сообщения.`);
            } else {
                dedGetAutoAnswer.push(userId);
                setStartChat(startChat => startChat + 1)
                console.log(dedGetAutoAnswer, 'dedGetAutoAnswer')

                await new Promise((resolve) => setTimeout(resolve, 2000));
                console.log(`Пользователь ${userId} получил ${inviteToSend}`);
                await SendMessage(userId, inviteToSend, setIsWaiting, setWaitSeconds);
            }


            // Открыть чат, анализировать сообщения и отправить дополнительные сообщения
            // const chatUrl = `https://login.romancecompass.com/chat/#${userId}`;
            // window.location.href = chatUrl;


            console.log('тут 1')
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Ждать загрузки чата (задержка в 2 секунды)

            const messageBoxes = document.querySelectorAll('.me');

            console.log(messageBoxes, 'messageBoxes .me')
            console.log(messageBoxes[0], messageBoxes[1], messageBoxes[2], messageBoxes[3], messageBoxes[4], messageBoxes[5], 'selectors')

            let foundKeyword = false;
            let sentResponseHAU = false;
            let sentResponseWAUF = false;
            let sentResponseWAULF = false;

            for (const selector of messageBoxes) {
                const messageContent = selector.querySelector('.chat-message-text');
                console.log(messageContent, 'messageContent .chat-message-text')
                const messageText = messageContent.textContent;
                console.log(messageText, 'messageText')

                if (
                    !sentResponseHAU &&
                    (messageText.includes('How') || messageText.includes('How are you?'))
                ) {
                    const inviteToSendAfterStartChatHAU = 'I am fine, thanks, what about you?';
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка в 2 секунды перед отправкой
                    console.log(`Пользователь ${userId} получил ${inviteToSendAfterStartChatHAU}`)
                    await SendMessage(userId, inviteToSendAfterStartChatHAU, setIsWaiting, setWaitSeconds);
                    foundKeyword = true;
                    sentResponseHAU = true;
                } else if (
                    !sentResponseWAUF &&
                    (messageText.includes('Where') || messageText.includes('Where are you from?'))
                ) {
                    const inviteToSendAfterStartChatWAUF = 'I am from Ukraine, what about you?';
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка в 2 секунды перед отправкой
                    console.log(`Пользователь ${userId} получил ${inviteToSendAfterStartChatWAUF}`)
                    await SendMessage(userId, inviteToSendAfterStartChatWAUF, setIsWaiting, setWaitSeconds);
                    foundKeyword = true;
                    sentResponseWAUF = true;
                } else if (
                    !sentResponseWAULF &&
                    (messageText.includes('looking') ||
                        messageText.includes('find') ||
                        messageText.includes('search'))
                ) {
                    const inviteToSendAfterStartChatWAULF = 'I am looking for my husband here, what about you?';
                    await new Promise((resolve) => setTimeout(resolve, 2000)); // Задержка в 2 секунды перед отправкой
                    console.log(`Пользователь ${userId} получил ${inviteToSendAfterStartChatWAULF}`)
                    await SendMessage(userId, inviteToSendAfterStartChatWAULF, setIsWaiting, setWaitSeconds);
                    foundKeyword = true;
                    sentResponseWAULF = true;
                }
            }

            if (!foundKeyword) {
                const message = [
                    '<img oncontrolselect="return false;" alt="undefined" src="/Smiles/smiless/_define026.gif" align="undefined">',
                    '<img oncontrolselect="return false;" alt="undefined" src="/Smiles/smiless/_define022.gif" align="undefined">',
                    'How are you today?',
                    'Nice to hear from you! How is your day?'
                ]
                const randomMessage = message[Math.floor(Math.random() * message.length)];
                console.log('Нет ключевых слов в сообщениях. Пробуем отправить стикер или второй автоответ');
                console.log(usersWithSentMessage, 'usersWithSentMessage')

                if (!usersWithSentMessage.includes(userId)) {
                    usersWithSentMessage.push(userId);
                    console.log(`Пользователь ${userId} получил стикер ${randomMessage}`);
                    await SendMessage(userId, randomMessage, setIsWaiting, setWaitSeconds);
                } else {
                    console.log(`Пользователь ${userId} уже получил ${randomMessage}. Ничего не отправлено!!!`);
                }
            }
        }
    }
}

export default CheckForNewMessages;
