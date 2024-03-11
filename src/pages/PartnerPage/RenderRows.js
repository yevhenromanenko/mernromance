import AuthUser from "./AuthUser/AuthUser";
import React, {useState, useEffect} from "react";

const renderedRows = (props) => {
    photoList
    const [ladyId] = props
    //const [photoList] = props;
    const [statDay, setStatDay] = useState('');
    const [statMonth, setStatMonth] = useState('');

    useEffect(() => {
        fetch()
            .then(res => res.text())
            .then(
                (data) => {
                    //stata day
                },
                (error) => {
                    console.error(error);
                }
            );
    },[]);

    useEffect(() => {
        axios()
            .then(res => res.text())
            .then(
                (data) => {

                },
                (error) => {
                    console.error(error)
                }
            )
    }, []);

    // const name = nameMap[photo.id];
    // const isOnlineHere = isOnline[photo.id];
    // const profitHere = profits[photo.id];

    return (
        <>
        {photoList.map((photo, index) => {
            return (
                <tr key={photo.id}>
                    <td className={"td-row"}>
                        {
                            (<div style={{ display: 'flex' }}>
                                <img
                                    style={{height: '80px', width: '60px'}}
                                    src={`https://romancecompass.com/media/profilephoto/000${photo.id}/${photo.imageName}`}
                                    alt={`Image ${index}`}
                                />
                                <div className={"right-row"}>
                                    <a href={`https://romancecompass.com/partner/profile/edit/?id=${photo.id}`} style={{color: 'white'}}>{photo.id}</a>
                                    <span><br/>{name}</span>
                                    {isOnlineHere === "1" ? <span style={{color: 'green'}}><br/>Online</span> : <span style={{color: 'red'}}><br/>Offline</span>}
                                </div>
                            </div>)
                        }
                    </td>
                    <td className={"td-row"}> {profitHere ? (
                        <>
                            <br />
                            Today: ${statDay}, Month: ${statMonth}
                        </>
                    ) : (
                        <br />
                    )}</td>
                    <td className={"td-row"}>{profitHere?.month}</td>
                    <td className={"td-row"}>
                        <div>Заработано за сегодня: {profits[photo.id]?.today}</div>
                        <div>Заработано за месяц: {profits[photo.id]?.month}</div>
                    </td>
                    {/*<td className={"td-row"}>{<AuthUser/>}</td>*/}
                    {/*// <td className={"td-row"}>{<UserAccount/>}</td>*/}
                </tr>
            )
            })}
      </>
    )};

export default renderedRows;

