import axios from "axios";

const SendMessage = (user, invite, setIsWaiting, setWaitSeconds) => {
    const handleSendMessage = async () => {
    const response = await axios.post('https://login.romancecompass.com/chat/', {
        ajax: 1,
        action: 'send_message',
        c_id: user,
        message: `${invite}`
    }, {
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded",
            "x-requested-with": "XMLHttpRequest"
        },
        withCredentials: true
    });

    if (response.data.result === 'waitUntil') {
        setWaitSeconds(response.data.data.waitSeconds);
        setIsWaiting(true);
    }
    return response;
    };
    handleSendMessage();
}

export default SendMessage;
