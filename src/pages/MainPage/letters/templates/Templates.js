import {useEffect, useState} from "react";
import InsertButtons from "../../insert-text-button/InsertButtons";
import axios from "axios";
import TemplatesFromServer from "../templates-from-server/TemplatesFromServer";
import {SERVER_NAME} from "../../../../server_name";


const Templates = () => {

    const [templatesSubject, setTemplatesSubject] = useState("");
    const [templatesContent, setTemplatesContent] = useState("");

    useEffect(() => {
        TemplatesFromServer(setTemplatesSubject, setTemplatesContent);
    }, []);

    const handleSaveTemplates = async () => {

        if (typeof templatesSubject === 'undefined' || templatesSubject.length < 5) {
            alert('Тема слишком короткая');
            return;
        }

        if (typeof templatesContent === 'undefined' || templatesContent.length < 200) {
            alert('Письмо слишком короткое');
            return;
        }

        try {
            const res = await axios.get('https://login.romancecompass.com/chat/')
            const html = res.data;
            const match = html.match(/<b>(\d+)<\/b>/);
            const ladyId = match ? match[1] : null;

            await axios.post(`https://${SERVER_NAME}/templatesLetter`,
                {
                    ladyId: ladyId,
                    subject: templatesSubject,
                    content: templatesContent,
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
            setTemplatesSubject(event.target.value);
        };

        const handleContentChange = (event) => {
            setTemplatesContent(event.target.value);
        };

        return (
            <div className="email-form">
                <p style={{color: '#e09f3e'}}>Здесь вы можете добавить шаблон для отправки первого письма мужчине! Он будет подгружаться при отправки первого письма после чата!</p>
                <div>
                    <label className={'label-class'} htmlFor="subject">Тема письма для шаблона:</label><br/>
                    <InsertButtons
                        setContent={setTemplatesSubject}
                        textareaName={'subject'}
                    /><br/>
                    <textarea
                        id="subject"
                        className={'subject-letter'}
                        placeholder={"Напишите тему письма"}
                        name="subject"
                        value={templatesSubject}
                        onChange={handleSubjectChange}
                    />
                </div>
                <div>
                    <label className={'label-class'} htmlFor="content">Текст письма для шаблона:</label><br/>
                    <InsertButtons
                        setContent={setTemplatesContent}
                        textareaName={'content'}
                    /><br/>
                    <textarea
                        id="content"
                        className={'content-letter'}
                        placeholder={'Напишите и сохраните письмо для шаблона'}
                        name="content"
                        value={templatesContent}
                        onChange={handleContentChange}
                    />
                </div>
                <div>

                    <button className={'waves-effect waves-light btn-save-letter'} onClick={handleSaveTemplates}
                            style={{marginLeft: '173px'}}>Сохранить шаблон
                    </button>
                </div>
            </div>
        )
}

export default Templates;
