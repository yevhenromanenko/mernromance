import InsertButtons from "../../../insert-text-button/InsertButtons";
import PhotoGallery from "../../photo-gallery/PhotoGallery";
import React, {useState} from "react";
import axios from "axios";
import CheckContentLetter from "../../check-content-letter/CheckContentLetter";
import {SERVER_NAME} from "../../../../../server_name";


const OnlineLetter = ({users, log, setEmailSubject, emailSubject, setEmailContent, emailContent, selectedPhotoCount, setSelectedPhotoId, setSelectedPhotoCount, selectedPhotoId}) => {

    const [isPhotoGalleryVisible, setIsPhotoGalleryVisible] = useState(false);

    const handleSaveEmail = async () => {

        let checkIt = CheckContentLetter(emailSubject, emailContent, selectedPhotoId); // проверяем письмо на содержание темы, текста и фото
        if (typeof checkIt === 'undefined' || checkIt === false) {
            return;
        }

        try {
            const res = await axios.get('https://login.romancecompass.com/chat/')
            const html = res.data;
            const match = html.match(/<b>(\d+)<\/b>/);
            const ladyId = match ? match[1] : null;

            await axios.post(`https://${SERVER_NAME}/letter`,
                {
                    ladyId: ladyId,
                    subject: emailSubject,
                    content: emailContent,
                    photoId: selectedPhotoId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            alert('Письмо было сохранено!')
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubjectChange = (event) => {
        setEmailSubject(event.target.value);
    };

    const handleContentChange = (event) => {
        setEmailContent(event.target.value);
    };

    const togglePhotoGallery = () => {
        setIsPhotoGalleryVisible(!isPhotoGalleryVisible);
    };


    return (
        <div className="email-form">
            <p style={{color: '#e09f3e'}}>Онлайн рассылка писем предназначена для мужчин, которые на данный момент в онлайне, вот их количество: {users.length}</p>
            <div className={'log_spam_letter'}>
                {log.map((message, index) => (
                    <div key={index}>{message}</div>
                )).reverse()}
            </div>
            <div>
                <label className={'label-class'} htmlFor="subject">Тема письма:</label><br/>
                <InsertButtons
                    setContent={setEmailSubject}
                    textareaName={'subject'}
                /><br/>
                <textarea
                    id="subject"
                    className={'subject-letter'}
                    placeholder={"Напишите тему письма"}
                    name="subject"
                    value={emailSubject}
                    onChange={handleSubjectChange}
                />
            </div>
            <div>
                <label className={'label-class'} htmlFor="content">Текст письма:</label><br/>
                <InsertButtons
                    setContent={setEmailContent}
                    textareaName={'content'}
                /><br/>
                <textarea
                    id="content"
                    className={'content-letter'}
                    placeholder={'Напишите и сохраните письмо для рассылки'}
                    name="content"
                    value={emailContent}
                    onChange={handleContentChange}
                />
            </div>
            <div>
                <button className={'waves-effect waves-light btn-save-letter'} onClick={togglePhotoGallery}>
                    {!isPhotoGalleryVisible ? `Фото: ${selectedPhotoCount} ⬇` : `Фото: ${selectedPhotoCount} ⬆`}
                </button>
                <button className={'waves-effect waves-light btn-save-letter'} onClick={handleSaveEmail}
                        style={{marginLeft: '173px'}}>Сохранить
                </button>
                {isPhotoGalleryVisible && (
                    <PhotoGallery
                        setSelectedPhotoId={setSelectedPhotoId}
                        setSelectedPhotoCount={setSelectedPhotoCount}
                    />
                )}
            </div>
        </div>
    )
}

export default OnlineLetter;
