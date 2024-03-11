import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const AddPersonalInviteToServer = async (text, invitePersonalBD, setInvitePersonalBD) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const newId = match ? match[1] : null;

        const newItem = {
            text,
            id: Date.now().toString(),
            ladyId: newId,
            smile: true,
        };

        const response = await axios.post(`https://${SERVER_NAME}/invitesPersonal`, {...newItem}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const newInvitesBD = [...invitePersonalBD, response.data];
        setInvitePersonalBD(newInvitesBD);
    } catch (error) {
        console.error("Error adding invite to server:", error);
    }
}

export default AddPersonalInviteToServer
