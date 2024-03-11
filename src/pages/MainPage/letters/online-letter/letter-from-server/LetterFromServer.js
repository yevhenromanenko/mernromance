import axios from "axios";
import {SERVER_NAME} from "../../../../../server_name";

const LetterFromServer = async (setEmailSubject, setEmailContent, setSelectedPhotoId) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const ladyId = match ? match[1] : null;

        const response = await axios.get(`https://${SERVER_NAME}/letter?ladyId=${ladyId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { subject, content, photoId } = await response.data;

        setEmailSubject(subject);
        setEmailContent(content);
        setSelectedPhotoId(photoId);
    } catch (err) {
        console.error(err);
    }
};

export default LetterFromServer;
