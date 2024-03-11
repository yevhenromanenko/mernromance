import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_NAME} from "../../../server_name";


const ActualMassLetter = () => {
    const [lastSendingDate, setLastSendingDate] = useState(null)

    useEffect(() => {
        const fetchRequestCount = async () => {
            try {
                const res = await axios.get('https://login.romancecompass.com/chat/')
                const html = res.data;
                const match = html.match(/<b>(\d+)<\/b>/);
                const newId = match ? match[1] : null;

                const response = await axios.get(`https://${SERVER_NAME}/lastSentDate?id=${newId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const { date } = response.data;
                setLastSendingDate(date);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRequestCount();
        // обновляем счетчик при изменении значения setTodayCount

    }, []);

    var dt = new Date(lastSendingDate);

    function addLeadingZero(number) {
        return number < 10 ? "0" + number : number;
    }

    var day = addLeadingZero(dt.getDate());
    var month = addLeadingZero(dt.getMonth() + 1);
    var year = dt.getFullYear();
    var outputDate = day + "." + month + "." + year;

    if (lastSendingDate) {
        const lastSendDay = Date.parse(lastSendingDate);
        const currentDate = new Date();
        const nowDay = Date.parse(currentDate);

        const timeDiff = Math.abs(nowDay - lastSendDay);
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        const outdated = diffDays > 5;
        const color = outdated ? '#851919' : 'green';

        return { outdated, color, lastDate: outputDate, diffDays: diffDays };
    }
    return { outdated: false, color: 'green', lastDate: outputDate };
};

export default ActualMassLetter;
