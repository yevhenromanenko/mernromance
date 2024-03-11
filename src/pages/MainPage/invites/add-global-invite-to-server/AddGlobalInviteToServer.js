import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const AddGlobalInviteToServer = async (text, inviteBD, setInviteBD) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        const newItem = {
            text,
            id: Date.now().toString(),
            ladyId: newId,
        };

        const response = await axios.post(`https://soulmate-agency.com/romanceapp/invites`, {...newItem}, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const newInvitesBD = [...inviteBD, response.data];
        setInviteBD(newInvitesBD);
    } catch (error) {
        console.error("Error adding invite to server:", error);
    }
}

export default AddGlobalInviteToServer
