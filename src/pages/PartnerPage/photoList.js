// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const PhotoList = (props) => {
//
//     const {setIsLoading} = props
//
//     const [photoList, setPhotoList] = useState([]);
//     const [nameMap, setNameMap] = useState({});
//
//     useEffect(() => {
//         const fetchPhotos = async () => {
//             try {
//                 const [response1, response2] = await axios.all([
//                     axios.get('https://romancecompass.com/partner/profile/'),
//                     axios.get('https://romancecompass.com/partner/profile/?page=2'),
//                 ]);
//                 const html = response1.data + response2.data;
//
//                 const pattern = /src="\/media\/profilephoto\/000(\d+)\/(.+?)"/g;
//                 const photoIds = [];
//                 let match;
//                 while ((match = pattern.exec(html)) !== null) {
//                     photoIds.push({
//                         id: match[1],
//                         imageName: match[2],
//                     });
//                 }
//
//                 const pattern2 = /ID: <b>(\d+)<\/b><\/div> <b>([^\s]+) ([^\s]+)<\/b>/g;
//                 let nameMatch;
//                 while ((nameMatch = pattern2.exec(html)) !== null) {
//                     const id = nameMatch[1];
//                     const firstName = nameMatch[2];
//                     const lastName = nameMatch[3];
//                     setNameMap((prevNameMap) => ({
//                         ...prevNameMap,
//                         [id]: `${firstName} ${lastName}`,
//                     }));
//                 }
//                 setPhotoList(photoIds);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchPhotos();
//     }, []);
//
//     return (
//         <div>
//             {photoList.map((photo) => (
//                 <div key={photo.id}>{nameMap[photo.id]}</div>
//             ))}
//         </div>
//     );
// };
//
// export default PhotoList;
