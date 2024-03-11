import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const DeletePersonalInviteFromServer = async (id, invitePersonalBD, setInvitePersonalBD) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        await axios.delete(`https://${SERVER_NAME}/invitesPersonal?id=${id}&ladyId=${newId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newInvitesBD = invitePersonalBD.filter(item => item.id !== id);
        setInvitePersonalBD(newInvitesBD);
    } catch (error) {
        console.error(error);
    }
}

export default DeletePersonalInviteFromServer;
