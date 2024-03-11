import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const DeleteGlobalInviteFromServer = async (id, inviteBD, setInviteBD) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        await axios.delete(`https://${SERVER_NAME}/invites?id=${id}&ladyId=${newId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newInvitesBD = inviteBD.filter(item => item.id !== id);
        setInviteBD(newInvitesBD);
    } catch (error) {
        console.error(error);
    }
}

export default DeleteGlobalInviteFromServer;
