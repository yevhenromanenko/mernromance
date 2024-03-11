import InsertButtons from "../../../insert-text-button/InsertButtons";
import PhotoGallery from "../../photo-gallery/PhotoGallery";
import React, {useState} from "react";
import axios from "axios";
import CheckContentLetter from "../../check-content-letter/CheckContentLetter";
import {SERVER_NAME} from "../../../../../server_name";


const GlobalLetter = ({globalUsers, logGlobalLetter, setGlobalLetterSubject, globalLetterSubject, setGlobalLetterContent, globalLetterContent, selectedPhotoCountGlobalLetter, setSelectedPhotoIdForGlobalLetter, setSelectedPhotoCountGlobalLetter, selectedPhotoIdForGlobalLetter}) => {

    const [isPhotoGalleryVisibleGlobalLetter, setIsPhotoGalleryVisibleGlobalLetter] = useState(false);


    const handleSaveGlobalLetter = async () => {

        let checkIt = CheckContentLetter(globalLetterSubject, globalLetterContent, selectedPhotoIdForGlobalLetter); // проверяем письмо на содержание темы, текста и фото
        if (typeof checkIt === 'undefined' || checkIt === false) {
            return;
        }

        try {
            const res = await axios.get('https://login.romancecompass.com/chat/')
            const html = res.data;
            const match = html.match(/<b>(\d+)<\/b>/);
            const ladyId = match ? match[1] : null;

            await axios.post(`https://${SERVER_NAME}/globalLetter`,
                {
                    ladyId: ladyId,
                    subject: globalLetterSubject,
                    content: globalLetterContent,
                    photoId: selectedPhotoIdForGlobalLetter,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            alert('Письмо для глобальной рассылки было сохранено!')
        } catch (err) {
            console.error(err);
        }
    };

    const handleGlobalSubjectChange = (event) => {
        setGlobalLetterSubject(event.target.value);
    };

    const handleGlobalLetterContentChange = (event) => {
        setGlobalLetterContent(event.target.value);
    };

    const togglePhotoGallery = () => {
        setIsPhotoGalleryVisibleGlobalLetter(!isPhotoGalleryVisibleGlobalLetter);
    };


    return (
        <div className="email-form">
            <p style={{color: '#e09f3e'}}>Глобальная рассылка писем предназначена для мужчин, которые посещали сайт за последнюю неделю, вот их количество: {globalUsers.length}</p>
            <div className={'log_spam_letter'}>
                {logGlobalLetter.map((message, index) => (
                    <div key={index}>{message}</div>
                )).reverse()}
            </div>
            <div>
                <label className={'label-class'} htmlFor="subject">Тема письма:</label><br/>
                <InsertButtons
                    setContent={setGlobalLetterSubject}
                    textareaName={'subject'}
                /><br/>
                <textarea
                    id="subject"
                    className={'subject-letter'}
                    placeholder={"Напишите тему письма"}
                    name="subject"
                    value={globalLetterSubject}
                    onChange={handleGlobalSubjectChange}
                />
            </div>
            <div>
                <label className={'label-class'} htmlFor="content">Текст письма:</label><br/>
                <InsertButtons
                    setContent={setGlobalLetterContent}
                    textareaName={'content'}
                /><br/>
                <textarea
                    id="content"
                    className={'content-letter'}
                    placeholder={'Напишите и сохраните письмо для глобальной рассылки'}
                    name="content"
                    value={globalLetterContent}
                    onChange={handleGlobalLetterContentChange}
                />
            </div>
            <div>
                <button className={'waves-effect waves-light btn-save-letter'} onClick={togglePhotoGallery}>
                    {!isPhotoGalleryVisibleGlobalLetter ? `Фото: ${selectedPhotoCountGlobalLetter} ⬇` : `Фото: ${selectedPhotoCountGlobalLetter} ⬆`}
                </button>
                <button
                    className={'waves-effect waves-light btn-save-letter'}
                    onClick={handleSaveGlobalLetter}
                    style={{marginLeft: '173px'}}>
                    Сохранить
                </button>
                {isPhotoGalleryVisibleGlobalLetter && (
                    <PhotoGallery
                        setSelectedPhotoId={setSelectedPhotoIdForGlobalLetter}
                        setSelectedPhotoCount={setSelectedPhotoCountGlobalLetter}
                    />
                )}
            </div>
        </div>
    )
}

export default GlobalLetter;
