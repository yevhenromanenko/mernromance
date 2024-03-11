// import {useEffect, useState} from "react";
// import axios from "axios";
//
//
// const UserAccount = () => {
//     const [photo, setPhoto] = useState('');
//     const [isOnline, setIsOnline] = useState('0');
//     const [profitToday, setProfitToday] = useState('');
//     const [profitMonth, setProfitMonth] = useState('');
//
//     useEffect(() => {
//
//             axios.get("https://romancecompass.com/partner/profile/")
//                 .then(response => response.text())
//                 .then((data) => {
//                     console.log(data)
//                         const pattern = /src="\/media\/profilephoto\/000(\d+)\/(.+?)"/g;
//                         const photoIds = [];
//                         let match;
//                         while ((match = pattern.exec(data)) !== null) {
//                             photoIds.push({
//                                 id: match[1],
//                                 imageName: match[2],
//                             });
//                         }
//                         console.log(photoIds)
//                     },
//                     (error) => {
//                         console.log(error);
//                     }
//                 )
//          //   axios.get("https://romancecompass.com/partner/profile/?page=2")
//
//
//     }, [])
//
//     return (
//         <>
//         </>
//     )
//
// }
//
// export default UserAccount;
