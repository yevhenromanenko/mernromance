import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const FetchExcludedUserIdsToday = async (setExcludedUserIds) => {
    const res = await axios.get('https://login.romancecompass.com/chat/')
    const html = res.data;
    const match = html.match(/<b>(\d+)<\/b>/);
    const ladyId = match ? match[1] : null;
    // При загрузке страницы получаем список айди пользователей, получивших запрос сегодня
    try {
        const response = await axios.get(`https://${SERVER_NAME}/usersSpamLetter?ladyId=${ladyId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const userIds = response.data;
        setExcludedUserIds(userIds);
    } catch (error) {
        console.error('Error fetching excluded user IDs', error);
    }
};

export default FetchExcludedUserIdsToday;
