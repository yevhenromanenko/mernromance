import React, {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_NAME} from "../../../server_name";

const ActualMassSending = (props) => {
    const [lastSendingDate, setLastSendingDate] = useState(null)
    const [outdated, setOutdated] = useState(false);

    useEffect(() => {
        const fetchRequestCount = async () => {
            try {

                const { id } = props;
                const response = await axios.get(`https://${SERVER_NAME}/lastSentDate?id=${id}`, {
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

    }, [props]);

    useEffect(() => {
        if (lastSendingDate) {
            const lastSendDay = Date.parse(lastSendingDate);
            const currentDate = new Date();
            const nowDay = Date.parse(currentDate);

            const timeDiff = Math.abs(nowDay - lastSendDay);
            const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            if (diffDays > 5) {
                setOutdated(true);
            }
        }
    }, [lastSendingDate]);

    var dt = new Date(lastSendingDate);

    function addLeadingZero(number) {
        return number < 10 ? "0" + number : number;
    }

    var day = addLeadingZero(dt.getDate());
    var month = addLeadingZero(dt.getMonth() + 1);
    var year = dt.getFullYear();
    var outputDate = day + "." + month + "." + year;

    return (
            <>
                {
                    outputDate === '01.01.1970' ?
                        <span style={{color: '#4b2323'}}>Never done</span> :
                        outdated ?
                            <span style={{color: '#4b2323', fontSize: '12px'}}>Не актуальна! Последняя {outputDate}!</span> :
                            <span style={{color: 'green', fontSize: '12px'}}>Актуальна! Последняя {outputDate}!</span>
                }
            </>
    )
};

export default ActualMassSending;
