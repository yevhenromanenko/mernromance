import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const AddExcludedUserIdLetter = async (id) => {
    const res = await axios.get('https://login.romancecompass.com/chat/')
    const html = res.data;
    const match = html.match(/<b>(\d+)<\/b>/);
    const ladyId = match ? match[1] : null;

    try {
        // Добавление айди пользователя в список запросов на сервере
        await axios.post(`https://${SERVER_NAME}/usersSpamLetter`, { id: id, ladyId: ladyId}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.error('Error adding excluded user ID', error);
    }
};

export default AddExcludedUserIdLetter;
