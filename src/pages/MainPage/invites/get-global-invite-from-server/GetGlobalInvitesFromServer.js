import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const GetGlobalInvitesFromServer = async (setInviteBD) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        const response = await axios.get(`https://${SERVER_NAME}/invites?ladyId=${newId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.data
        console.log(data, 'data fron server')
        setInviteBD(data);
    } catch (error) {
        console.error(error);
    }
};

export default GetGlobalInvitesFromServer;


