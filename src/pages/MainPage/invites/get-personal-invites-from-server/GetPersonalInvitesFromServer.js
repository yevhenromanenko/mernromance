import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const GetPersonalInvitesFromServer = async (setInvitePersonalBD) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        const response = await axios.get(`https://${SERVER_NAME}/invitesPersonal?ladyId=${newId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.data;
        setInvitePersonalBD(data);
    } catch (error) {
        console.error("Error fetching personal invites:", error);
    }
};

export default GetPersonalInvitesFromServer;
