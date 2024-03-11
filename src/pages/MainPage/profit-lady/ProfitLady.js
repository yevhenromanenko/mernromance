import axios from "axios";
import React, {useEffect, useState} from "react";
import ActualMassLetter from "../../MassPage/actualMassLetter/ActualMassLetter";
import EmailNotifications from "../EmailNotifications/EmailNotifications";
import {SERVER_NAME} from "../../../server_name";


const ProfitLady = () => {
    const [profit, setProfit] = useState(null);
    const [loading, setLoading] = useState(true);
    const { outdated, color, lastDate, diffDays } = ActualMassLetter();
    const rate = 36.65;


    useEffect(() => {
        async function fetchProfit() {
            try {
                // Получаем HTML страницы с помощью axios
                const res = await axios.get('https://login.romancecompass.com/chat/');
                const html = res.data;
                // Извлекаем ID из HTML
                const match = html.match(/<b>(\d+)<\/b>/);
                const id = match ? match[1] : null;
                const response = await axios.get(`https://${SERVER_NAME}/profits?id=${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.data

                setProfit(data);
                setLoading(false);

            } catch (error) {
                console.error(error);
            }
        }

        fetchProfit();
    }, []);

    if (loading) {
        return <p style={{color: '#e09f3e', marginLeft: "10px", marginBottom: "0px"}}>Loading...</p>;
    }
    if (!profit) {
        return <p style={{color: '#e09f3e', marginLeft: "10px", marginBottom: "0px"}}>Еще ничего не заработано!</p>;
    }

    const profitMonth = (profit.month * rate) * 0.42;
    const profitToday = (profit.today * rate) * 0.42;

    return (
        <p style={{color: '#e09f3e', marginLeft: "10px", marginBottom: "0px"}}>
            <EmailNotifications/>
            ID: {profit.id} || Заработано за сегодня: {profitToday.toFixed(2)} грн || За месяц: {profitMonth.toFixed(2)} грн<br/>
            <span style={{ color }}>
                {
                lastDate === '01.01.1970' ?
                    <p style={{fontSize: '12px', border: 'solid red', padding: '5px'}}>Вы еще никогда не делали массовую рассылку, сделайте перейдя во вкладку <a href={'https://login.romancecompass.com/about-us/'}>Массовая рассылка</a></p> :
                outdated ?
                    `Обратите внимание, что вы не делали массовую рассылку уже ${diffDays} дней!` :
                    `Массовая рассылка актуальна! Последняя рассылка была ${lastDate}!`
                }
            </span>
        </p>
    );

}

export default ProfitLady;
