import axios from "axios";
import {SERVER_NAME} from "../../../../../server_name";

const GlobalLetterFromServer = async (setGlobalLetterSubject, setGlobalLetterContent, setSelectedPhotoIdForGlobalLetter) => {
    try {
        const res = await axios.get('https://login.romancecompass.com/chat/')
        const html = res.data;
        const match = html.match(/<b>(\d+)<\/b>/);
        const ladyId = match ? match[1] : null;

        const response = await axios.get(`https://${SERVER_NAME}/globalLetter?ladyId=${ladyId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const { subject, content, photoId } = await response.data;

        setGlobalLetterSubject(subject);
        setGlobalLetterContent(content);
        setSelectedPhotoIdForGlobalLetter(photoId);
    } catch (err) {
        console.error(err);
    }
};

export default GlobalLetterFromServer;
