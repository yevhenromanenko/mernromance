import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './PhotoGallery.scss'

const PhotoGallery = ({setSelectedPhotoId, setSelectedPhotoCount}) => {
    const [ladyPhotos, setLadyPhotos] = useState([]);
    const selectedPhotoIdRef = useRef(null);

    const handleClick = (event) => {
        const photoId = event.target.id;
        const selectedPhotoId = selectedPhotoIdRef.current;

        // Если кликнули на выбранную ранее фотографию, то снимаем выделение и сбрасываем selectedPhotoId
        if (photoId === selectedPhotoId) {
            setSelectedPhotoId(null);
            setSelectedPhotoCount(0);
            selectedPhotoIdRef.current = null;
            event.target.style.border = null;
        } else {
            // Снимаем выделение с предыдущей выбранной фотографии
            const selectedPhoto = document.getElementById(selectedPhotoId);
            if (selectedPhoto) {
                selectedPhoto.style.border = null;
            }

            // Выделяем выбранную фотографию и обновляем selectedPhotoId
            setSelectedPhotoId(photoId);
            setSelectedPhotoCount(1);
            selectedPhotoIdRef.current = photoId;
            event.target.style.border = "3px solid red";
        }
    };

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.post(
                    "https://login.romancecompass.com/letters/",
                    "route=write%2F377908&ajax=1",
                    {
                        headers: {
                            accept: "text/html, */*; q=0.01",
                            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                            "content-type": "application/x-www-form-urlencoded",
                            "x-requested-with": "XMLHttpRequest",
                        },
                        credentials: "include",
                    }
                );
                const html = response.data;
                const regex = /<div class="pop_bts"> <a href="\/media\/messages\/([^,]+)/gm;
                const matched = html.match(regex) || [];

                const getLadyIdAndLadyPhoto = matched.map((item) => {
                    return {
                        ladyId: item.split("/")[3].split("").splice(3).join(""),
                        ladyPhoto: item.split("/")[4].split(".")[0],
                        photoIdForSend: item.split("/")[5].split("(")[1],
                    };
                });

                const ladyId = getLadyIdAndLadyPhoto.map((item) => item.ladyId)[0];

                const arrPhotos = getLadyIdAndLadyPhoto.map((item) => {
                    const romanceDomain = 'https://login.romancecompass.com';

                    const img = (
                        <img
                            src={`${romanceDomain}/media/messages/000${ladyId}/${item.ladyPhoto}.thumb.jpg`}
                            className= 'img_lady'
                            id={item.photoIdForSend}
                            alt=""
                            onClick={handleClick}
                        />
                    );
                    return img;
                });

                setLadyPhotos(arrPhotos);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div style={{marginTop: '10px'}}>
            {ladyPhotos.length > 0 && <div className="photo-gallery">{ladyPhotos}</div>}
        </div>
    );
};

export default PhotoGallery;
