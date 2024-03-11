import axios from "axios";
import {SERVER_NAME} from "../../../../../server_name";

const FetchRequestCountGlobalLetters = async (setTodayCountGlobalLetter, setMonthCountGlobalLetter) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        const response = await axios.get(`https://${SERVER_NAME}/countGlobalLetters?id=${newId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setTodayCountGlobalLetter(response.data.today);
        setMonthCountGlobalLetter(response.data.month);
    } catch (err) {
        console.error(err);
    }
};

export default FetchRequestCountGlobalLetters;
