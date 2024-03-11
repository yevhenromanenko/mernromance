import axios from "axios";
import {SERVER_NAME} from "../../../../../server_name";

const FetchRequestCountLetters = async (setTodayCount, setMonthCount) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        const response = await axios.get(`https://${SERVER_NAME}/countletters?id=${newId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setTodayCount(response.data.today);
        setMonthCount(response.data.month);
    } catch (err) {
        console.error(err);
    }
};

export default FetchRequestCountLetters;
