import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GetInfoUser from "../global-letter/get-info-user/GetInfoUser";
import GetUserIdFromCurrentUrl from "../get-userId-from-current-url/GetUserIdFromCurrentUrl";
import ReplaceTagsTemplates from "../reaplace-tags-templates/ReplaceTagsTemplates";
import {SERVER_NAME} from "../../../../server_name";

const TemplatesForFirstLetter = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [showTemplate, setShowTemplate] = useState(false);
    const [noTemplateFound, setNoTemplateFound] = useState(false);

    useEffect(() => {
        const getTemplatesFromServer = async () => {
            try {
                const msgSubjectInput = document.querySelector('input[name="msg_subject"]');
                const msgContentTextarea = document.querySelector('textarea[name="msg_content"]');

                if (msgSubjectInput) {
                    msgSubjectInput.value = ''
                }

                if (msgContentTextarea) {
                    msgContentTextarea.value = '';
                }

                const res = await axios.get('https://login.romancecompass.com/chat/');
                const html = res.data;
                const match = html.match(/<b>(\d+)<\/b>/);
                const ladyId = match ? match[1] : null;

                const response = await axios.get(`https://${SERVER_NAME}/templatesLetter?ladyId=${ladyId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const { subject, content } = response.data;

                if (!subject && !content){
                    setNoTemplateFound(true); // Устанавливаем флаг, если шаблон не найден
                }

                const userId = GetUserIdFromCurrentUrl();

                const user = await GetInfoUser(userId);

                const replaceSubject = await ReplaceTagsTemplates(subject, user)
                const replaceContent = await ReplaceTagsTemplates(content, user)

                setSubject(replaceSubject);
                setContent(replaceContent);

            } catch (err) {
                console.error(err);
            }
        };

        getTemplatesFromServer();
    }, [])

    const useTemplate = () => {
        const msgSubjectInput = document.querySelector('input[name="msg_subject"]');
        const msgContentTextarea = document.querySelector('textarea[name="msg_content"]');

        if (msgSubjectInput) {
            msgSubjectInput.value = subject;
        }

        if (msgContentTextarea) {
            msgContentTextarea.value = content;
        }
    };

    const toggleUserList = () => {
        setShowTemplate(!showTemplate);
    };

    return (
        <div>
            <button className={'waves-effect waves-light btn-open-users'} style={{marginTop: '10px'}} onClick={toggleUserList}>
                {showTemplate ? 'Скрыть ⬆' : 'Шаблон первого письма ⬇'}
            </button>

            {showTemplate && !noTemplateFound ? (
                <div style={{marginLeft: '10px', maxWidth: '60%', color: 'white'}}>
                    <p style={{color: '#e09f3e'}}>Тема письма:</p>
                    <p style={{ color: 'white' }}>{subject}</p>
                    <p style={{color: '#e09f3e'}}>Текст письма:</p>
                    <p style={{ color: 'white' }}>{content}</p>

                    <button style={{marginBottom: '10px'}} className={'waves-effect waves-light btn-open-users'} onClick={useTemplate}>Использовать письмо</button>
                </div>
            ) : showTemplate && noTemplateFound ? (
                <p>
                    Добавьте письмо сначала в шаблоне:{' '}
                    <a href="https://login.romancecompass.com/search/">Добавить</a>
                </p>
            ) : null}
        </div>
    );
};

export default TemplatesForFirstLetter;
