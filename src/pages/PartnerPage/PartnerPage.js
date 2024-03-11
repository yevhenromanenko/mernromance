import React, { useEffect, useState} from 'react';
import './PartnerPage.scss'
import AuthUser from "./AuthUser/AuthUser";

import axios from "axios";
import IncomingMail from "./IncomingMail/IncomingMail";
import FetchProfits from "./ProfitsFetcher";
// import ExchangeRate from "../../exchangeRate";
import InvitesCounter from "./InvitesCounter/InvitesCounter";
import LetterCounter from "./letterCounter/LetterCounter";
import ActualMassSending from "./ActualMassSending/ActualMassSending";

const PartnerPage = () => {

    const [photoList, setPhotoList] = useState([]);
    const [nameMap, setNameMap] = useState({});
    const [isOnline, setIsOnline] = useState({});
    const [profits, setProfits] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [todaySum, setTodaySum] = useState(0);
    const [monthSum, setMonthSum] = useState(0);
    const [todaySumUah, setTodaySumUah] = useState(0);
    const [monthSumUah, setMonthSumUah] = useState(0);
    const rate = 36.65;

    useEffect(() => {

        const fetchPhotos = async () => {
            try {
                const [response1, response2] = await axios.all([
                    axios.get("https://romancecompass.com/partner/profile/"),
                    axios.get("https://romancecompass.com/partner/profile/?page=2"),
                ]);
                const html = response1.data + response2.data;

                const pattern = /src="\/media\/profilephoto\/000(\d+)\/(.+?)"/g;
                const photoIds = [];
                let match;
                while ((match = pattern.exec(html)) !== null) {
                    photoIds.push({
                        id: match[1],
                        imageName: match[2],
                    });
                }

                const pattern2 = /ID: <b>(\d+)<\/b><\/div> <b>([^\s]+) ([^\s]+)<\/b>/g;
                let nameMatch;
                while ((nameMatch = pattern2.exec(html)) !== null) {
                    const id = nameMatch[1];
                    const firstName = nameMatch[2];
                    const lastName = nameMatch[3];
                    setNameMap(prevNameMap => ({
                        ...prevNameMap,
                        [id]: `${firstName} ${lastName}`,
                    }));
                }
                setPhotoList(photoIds);

                if (photoIds.length > 0) {
                    const { profits, todaySum, monthSum } = await FetchProfits(photoIds);
                    setProfits(profits);
                    setTodaySum(todaySum);
                    setMonthSum(monthSum);
                    setTodaySumUah(todaySum * rate);
                    setMonthSumUah(monthSum * rate);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchIsOnline = async () => {
            try {
                const response = await axios.post("https://romancecompass.com/partner/chat_onliner/", "ajax=1&action=refresh&sel_girls%5B473124%5D=0&sel_girls%5B474010%5D=0&sel_girls%5B474877%5D=0&sel_girls%5B474885%5D=0&sel_girls%5B475697%5D=0&sel_girls%5B481105%5D=0&sel_girls%5B481111%5D=0&sel_girls%5B492249%5D=0&sel_girls%5B517487%5D=0&sel_girls%5B611855%5D=0&sel_girls%5B679158%5D=0&sel_girls%5B688838%5D=0&sel_girls%5B726390%5D=0&sel_girls%5B764371%5D=0&sel_girls%5B810062%5D=0&sel_girls%5B912763%5D=0&sel_girls%5B966684%5D=2&status=0")
                const partners = response.data.data;
                const idToOnlineMap = partners.reduce((prevMap, partner) => {
                    return { ...prevMap, [partner.id]: partner.is_online };
                }, {});

                setIsOnline(idToOnlineMap);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
        fetchIsOnline();

    }, []);

        const renderedRows = photoList.map((photo) => {

            if (photo.id === "966708" || photo.id === "647428" || photo.id === "481110" || photo.id === "473135" || photo.id === "481115") {
                return null; // деактивированные профайлы
            }

            const name = nameMap[photo.id];
            const isOnlineHere = isOnline[photo.id];
            const profitHere = profits[photo.id] || { today: '0', month: '0' };

        return (
        <tr key={photo.id}>
            <td className={"td-row"}>
                {
                     (<div style={{ display: 'flex' }}>
                        <img
                            style={{height: '80px', width: '60px'}}
                            src={`https://romancecompass.com/media/profilephoto/000${photo.id}/${photo.imageName}`}
                            alt={photo.id}
                        />
                        <div className={"right-row"}>
                            <a href={`https://romancecompass.com/partner/profile/edit/?id=${photo.id}`} style={{color: 'white'}}>{photo.id}</a>
                            <span><br/>{name}</span>
                            {isOnlineHere === "1" ? <span style={{color: 'green'}}><br/>Online</span> : <span style={{color: '#4b2323'}}><br/>Offline</span>}
                            <br/>{<ActualMassSending id={photo.id}/>}
                        </div>
                    </div>)
                }
            </td>
            <td className={"td-row"}>{<InvitesCounter id={photo.id}/>}</td>
            <td className={"td-row"}>{<LetterCounter id={photo.id}/>}</td>
            <td className={"td-row"}>
                <div>Заработано за сегодня: <span style={{color: '#e09f3e'}}>{profitHere?.today}</span></div>
                <div>Заработано за месяц: <span style={{color: '#e09f3e'}}>{profitHere?.month}</span></div>
            </td>
            <td className={"td-row"}>{<AuthUser id={photo.id}/>}</td>
        </tr>
        )
        });


    return (
        <>
            {null ? null : (<div style={{ borderBottom: "1px solid white"}}>{<IncomingMail/>}</div>)}
        <div>
            {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                        <tr className={"td-row"}>
                            <th>ПРОФИЛЬ</th>
                            <th>ИНВАЙТЫ</th>
                            <th>ПИСЬМА</th>
                            <th>СТАТИСТИКА</th>
                            <th>ПЕРЕВОДЧИК</th>
                        </tr>
                        </thead>
                        <tbody>
                            {renderedRows}
                        </tbody>
                    </table>
            )}
        </div>
            <div style={{paddingLeft: '880px'}}>
                <p>Заработано за сегодня: [${todaySum}], <a style={{color: '#e09f3e', textDecoration: 'underline'}}>[{todaySumUah.toFixed(2)} грн.]</a></p>
                <p>Заработано за месяц: [${monthSum}], <a style={{color: '#e09f3e', textDecoration: 'underline'}}>[{monthSumUah.toFixed(2)} грн.]</a></p>
            </div>
            {/*<div>*/}
            {/*    {<ExchangeRate/>}*/}
            {/*    /!*{usdBuyRate && <p>USD buy - {usdBuyRate}</p>}*!/*/}
            {/*</div>*/}
        </>
    );
}

export default PartnerPage;

