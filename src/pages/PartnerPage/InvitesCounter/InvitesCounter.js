import React, { useState, useEffect } from "react";
import axios from "axios";
import {SERVER_NAME} from "../../../server_name";

function InvitesCounter(props) {
    const { id } = props;
    const [todayCount, setTodayCount] = useState(0);
    const [monthCount, setMonthCount] = useState(0);

    useEffect(() => {
        const fetchRequestCount = async () => {
            try {
                const response = await axios.get(`https://${SERVER_NAME}/countinvites?id=${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setTodayCount(response.data.today);
                setMonthCount(response.data.month);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRequestCount();
    }, [todayCount]);

    return (
        <>
            Отправлено за сегодня: <span style={{color: '#e09f3e'}}>{todayCount}</span><br/>
            Отправлено за месяц: <span style={{color: '#e09f3e'}}>{monthCount}</span>
        </>
    );
}

export default InvitesCounter;
