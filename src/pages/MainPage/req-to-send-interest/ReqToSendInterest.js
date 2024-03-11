import axios from "axios";

const RequestToSendInterest = async (dedId) => {

    const randomInterest = Math.floor(Math.random() * 5) + 1;

    const sendNewInterest = await axios.post(`https://login.romancecompass.com/man/${dedId}/interest/`,
        {
            interest_id: randomInterest
        },
        {
            headers: {
                accept: "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded",
                "x-requested-with": "XMLHttpRequest"
            },
            withCredentials: true,
            referrer: "https://login.romancecompass.com/man/1777876/",
            referrerPolicy: "strict-origin-when-cross-origin",
        }
    );
    return sendNewInterest;
}

export default RequestToSendInterest;

