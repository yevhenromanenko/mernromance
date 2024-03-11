import GetUsersForMassLetters from "../../../MassPage/get-users-for-mass-letters/GetUsersForMassLetters";
import axios from "axios";
import {SERVER_NAME} from "../../../../server_name";

const ExcludedUsersForLetter = async (setAllUsers) => {
    const res = await axios.get('https://login.romancecompass.com/chat/')
    const html = res.data;
    const match = html.match(/<b>(\d+)<\/b>/);
    const ladyId = match ? match[1] : null;

    const data = await GetUsersForMassLetters();
    const response = await axios.get(`https://${SERVER_NAME}/usersMassLetter?ladyId=${ladyId}`);
    const dataAddedUsers = response.data;
    setAllUsers([...data, ...dataAddedUsers]);
};

export default ExcludedUsersForLetter;
