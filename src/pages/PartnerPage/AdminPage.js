// import React, { useEffect, useState } from 'react';
// import './PartnerPage.scss';
// import AuthUser from './AuthUser/AuthUser';
// import PhotoList from "./photoList";
// import axios from "axios";
// // import OnlineStatusList from './OnlineStatusList';
// // import ProfitList from './ProfitList';
//
// const PartnerPage = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [id, setId] = useState([]);
//     const [name, setName] = useState([])
//
//     useEffect(() => {
//         const fetchId = async () => {
//                 await axios.post('https://romancecompass.com/partner/chat_onliner/', {
//                     ajax: 1,
//                     action: 'refresh',
//                     sel_girls: {'473124': 0, '474010': 0, '474877': 0, '474885': 0, '475697': 0, '481105': 0, '481111': 0, '492249': 2, '517487': 2, '611855': 0, '679158': 0, '688838': 0, '726390': 2, '764371': 0, '810062': 0, '912763': 2, '966684': 2},
//                     status: 0
//                 }).then(response => {
//                         const ids = response.data.data.map(item => item.id);
//                         const name = response.data.data.map(item => item.name);
//                         console.log(ids);
//                         setId(ids)
//                         setName(name)
//                 }).catch(error => {
//                     console.error(error);
//                 });
//         }
//         fetchId();
//     }, [])
//
//
//     useEffect(() => {
//         setIsLoading(true);
//     }, []);
//
//
//     const renderRows = () => {
//
//         return (
//             // <tr>
//             //     <td className={"td-row"}><PhotoList setIsLoading={setIsLoading} /></td>
//             //     <td className={"td-row"}>{'что то'}</td>
//             //     <td className={"td-row"}>{'что то'}</td>
//             //     <td className={"td-row"}>{'что то'}</td>
//             //     <td className={"td-row"}><AuthUser /></td>
//             //     {/*<OnlineStatusList setIsLoading={setIsLoading} />*/}
//             //     {/*<ProfitList setIsLoading={setIsLoading} />*/}
//             // </tr>
//             <tr>
//                 <td className={"td-row"}>{name.map(item => item)}</td>
//                 <td className={"td-row"}>{id.map(item => item)}</td>
//                 <td className={"td-row"}><PhotoList setIsLoading={setIsLoading}/></td>
//             </tr>
//         )
//     }
//
//     return (
//         <div>
//             <table>
//                 <thead>
//                 <tr className={"td-row"}>
//                     <th>ПРОФИЛЬ</th>
//                     <th>ИНВАЙТЫ</th>
//                     <th>ПИСЬМА</th>
//                     <th>СТАТИСТИКА</th>
//                     <th>ПЕРЕВОДЧИК</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                  {renderRows()}
//                 </tbody>
//             </table>
//         </div>
//
//     )
// };
//
// export default PartnerPage;
