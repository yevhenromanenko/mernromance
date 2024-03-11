import axios from 'axios';
import React from "react";

const SendLetter = (dedId, images, letterSubject, letterContent) => {

    const createCaptchaTask = async () => {
        const apikey = 'f5ec7b9ae792eec87bf251ccc9df2eb3';
        const domain = 'login.romancecompass.com';
        const sitekey = '6Ld3ZCETAAAAAGA2dogwq4w-Bg8NubXSio87kX_b';
        //const secret = 'f5ec7b9ae792eec87bf251ccc9df2eb3';

        if (apikey === '') {
            alert('API key required. Register in anti-captcha.com, topup your balance and grad the key from API Setup.');
            return false;
        }

        if (domain === '' || sitekey === '') {
            alert('Enter domain and sitekey of Recaptcha v2 widget');
            return false;
        }

        const payload = {
            'clientKey': apikey,
            'task': {
                "type": "NoCaptchaTaskProxyless",
                "websiteURL": "http://" + domain + "/",
                "websiteKey": sitekey
            }
        };

        try {
            // Отправка запроса на создание задачи
            const response = await axios.post('https://api.anti-captcha.com/createTask', payload);
            if (response.status === 200) {
                const json = response.data;
                if (json.errorId === 0) { // Нет ошибок
                    return json.taskId;
                } else {
                    console.error('Got error from API:', json.errorCode, json.errorDescription);
                    return false;
                }
            } else {
                console.error('Error creating captcha task:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Error creating captcha task:', error);
            return false;
        }
    };

    // Функция для получения результатов задачи обхода капчи
    const getCaptchaTaskResult = async (taskId) => {
        const apikey = 'f5ec7b9ae792eec87bf251ccc9df2eb3';

        if (apikey === '') {
            alert('API key required. Register in anti-captcha.com, topup your balance and grad the key from API Setup.');
            return false;
        }
        if (taskId === '') {
            alert('Task ID required');
            return false;
        }

        const payload = {
            'clientKey': apikey,
            'taskId': taskId
        };

        try {
            const response = await axios.post('https://api.anti-captcha.com/getTaskResult', payload);
            if (response.status === 200) {
                const json = response.data;
                if (json.errorId === 0) { // Нет ошибок
                    return json.status === 'ready' ? json.solution.gRecaptchaResponse : 'pending';
                } else {
                    console.error('Got error from API:', json.errorCode, json.errorDescription);
                    return false;
                }
            } else {
                console.error('Error getting captcha task result:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Error getting captcha task result:', error);
            return false;
        }
    };


    const sendLetter = async () => {

        if (dedId === '37065') {
            console.log('Денису не отправляем')
            return;
        }
        console.log('send to', dedId)

        const formData = new FormData();
        formData.append('contact_id', `${dedId}`);
        formData.append('msg_img_id', `${images}`);
        formData.append('letter_id', '0');
        formData.append('draft_id', `0`); // 310893408 - рандомное число? 311216108 - 311215780 - похоже как количество отправленных писем вообще на сайте
        formData.append('rotateDegrees', '0'); // 0 тоже я думаю что по умолчанию 0
        formData.append('msg_subject', `${letterSubject}`);
        formData.append('msg_content', `${letterContent}`); // /r/n ??? как это учесть в самом письме если письмо записывать в переменную?
        formData.append('msgimg', ''); // добавленная фотка по факту
        formData.append('ajax', '1');
        formData.append('a', 'mc');

        try {
            const response = await axios.post(`https://login.romancecompass.com/letters/write_new/`, formData);
            const result = response.data.result

            if (response.status === 200) {
                 if (result === 'show_captcha') {

                    const taskId = await createCaptchaTask();

                    if (taskId) {
                        let captchaResult = 'pending';
                        while (captchaResult === 'pending') {
                            await new Promise(resolve => setTimeout(resolve, 1000)); // Пауза 1 секунда перед повторным запросом
                            captchaResult = await getCaptchaTaskResult(taskId);
                        }

                        formData.append('g-recaptcha-response', captchaResult);

                        // Повторная попытка отправить письмо с введенной капчей
                        const retryResponse = await axios.post('https://login.romancecompass.com/letters/write_new/', formData);
                        if (retryResponse.status === 200) {
                            const retryResult = retryResponse.data.result;
                            console.log(`Отправили письмо мужчине id: ${dedId}, статус отправки после капчи - ${retryResult}`);
                        } else {
                            console.error('Error sending letter with captcha:', retryResponse.status);
                        }
                    } else {
                        console.error('Error creating captcha task');
                    }
                } else {
                    console.log(`Отправили письмо мужчине id: ${dedId}, статус отправки без капчи - ${result}`);
                }
            } else {
                console.error('Error sending letter:', response.status);
            }
        } catch (error) {
            console.error('Error send letter', error);
        }
    };
    sendLetter();
};

export default SendLetter;
