import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const TemplatesFromServer = async (setSubject, setContent) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const ladyId = match ? match[1] : null;

        const response = await axios.get(`https://${SERVER_NAME}/templatesLetter?ladyId=${ladyId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { subject, content } = await response.data;

        setSubject(subject);
        setContent(content);
    } catch (err) {
        console.error(err);
    }
};

export default TemplatesFromServer;
