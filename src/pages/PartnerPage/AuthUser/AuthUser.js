import React, {useEffect, useState} from "react";
import axios from "axios";
import './AuthUser.scss'
import {SERVER_NAME} from "../../../server_name";

const AuthUser = (props) => {

    const { id } = props;

    const [translator, setTranslator] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    });

    const [isSaved, setIsSaved] = useState(false);
    const [idError, setIdError] = useState('');
    const [nameError, setNameError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isFormCollapsed, setIsFormCollapsed] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    ////====
    const [comment, setComment] = useState('');
    const [isCommentVisible, setIsCommentVisible] = useState(false);

    const handleInputChange = (event) => {
        setTranslator({...translator, [event.target.name]: event.target.value});
    };

    function toggleForm() {
        setIsFormCollapsed(!isFormCollapsed);
    }

    function toggleComment() {
        setIsCommentVisible(!isCommentVisible);
    }

    const validateInput = (name, value) => {
        switch (name) {
            case 'id':
                if (value.trim() === '') {
                    return 'ID is required';
                }
                return '';
            case 'name':
                if (value.trim() === '') {
                    return 'Name is required';
                }
                return '';
            case 'email':
                if (value.trim() === '') {
                    return 'Email is required';
                }
                return '';
            case 'password':
                if (value.trim() === '') {
                    return 'Password is required';
                }
                return '';
            default:
                return '';
        }
    };

    const handleInputBlur = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'id':
                setIdError(validateInput(name, value));
                break;
            case 'name':
                setNameError(validateInput(name, value));
                break;
            case 'email':
                setLoginError(validateInput(name, value));
                break;
            case 'password':
                setPasswordError(validateInput(name, value));
                break;
            default:
                break;
        }
        setIsFormValid(!idError && !nameError && !loginError && !passwordError);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const idError = validateInput('id', translator.id);
        const nameError = validateInput('name', translator.name);
        const loginError = validateInput('email', translator.email);
        const passwordError = validateInput('password', translator.password);

        if (idError || nameError || loginError || passwordError) {
            setIdError(idError);
            setNameError(nameError);
            setLoginError(loginError);
            setPasswordError(passwordError);
            return;
        }

        try {
        await axios.post(`https://${SERVER_NAME}/registration`, {...translator}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setIsSaved(true);

        } catch (error) {
            console.log(error)
        }
    };

    const handleReset = () => {
        setTranslator({ id: '', name: '', email: '', password: '' });
        setIdError('')
        setNameError('');
        setLoginError('');
        setPasswordError('');
        setIsFormValid(false);
        setIsSaved(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://${SERVER_NAME}/user?id=${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setIsSaved(false);
            handleReset(); // очищаем форму
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsFormValid(!idError && !nameError && !loginError && !passwordError);
    }, [idError, nameError, loginError, passwordError]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://${SERVER_NAME}/user?id=${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.data

                setTranslator(data);
                setIsSaved(true);

            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();

    }, [isSaved]);

    if (!isSaved) {
        return (
            <div>
                <button
                    className={`button-info ${isFormCollapsed ? '' : 'collapsed'}`}
                    onClick={toggleForm}
                >
                    Информация
                </button>
                <div className={`form-group ${isFormCollapsed ? 'collapsed' : ''}`}>
                    <div className="form-input">
                        <label>
                            ID девушки:
                            {idError ? <span style={{color: 'red'}}>{idError}</span> : null}
                            <input
                                type="text"
                                name="id"
                                className='validate'
                                value={translator.id}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}/>
                        </label>
                        <label>
                            Имя переводчика:
                            {nameError ? <span style={{color: 'red'}}>{nameError}</span> : null}
                            <input
                                type="text"
                                name="name"
                                className='validate'
                                value={translator.name}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}/>
                        </label>
                        <label>
                            email:
                            {loginError ? <span style={{color: 'red'}}>{loginError}</span> : null}
                            <input
                                type="text"
                                name="email"
                                className='validate'
                                value={translator.email}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}/>
                        </label>
                        <label>
                            Password:
                            {passwordError ? <span style={{color: 'red'}}>{passwordError}</span> : null}
                            <input
                                type="text"
                                name="password"
                                className='validate'
                                value={translator.password}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}/>
                        </label>
                        <div className="form-actions">
                            <button
                                className='btns-partner btn-cancel'
                                onClick={handleReset}
                                disabled={!isFormValid}
                            >
                                Очистить
                            </button>
                            <button
                                className='btns-partner btn-save'
                                onClick={handleSubmit}
                                disabled={!isFormValid}
                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                {/*)}*/}
            </div>
        </div>
            )
    }

    return (
                <div>
                    <p style={{marginTop: "5px", marginBottom: "5px"}}>ID анкеты: <span style={{color: '#e09f3e'}}>{translator.id}</span></p>
                    <p style={{marginTop: "5px", marginBottom: "5px"}}>Имя переводчика: <span style={{color: '#e09f3e'}}>{translator.name}</span></p>
                    <p style={{marginTop: "5px", marginBottom: "5px"}}>Email: <a href={`https://romancecompass.com/partner/profile/edit/?id=${translator.id}`} style={{color: '#e09f3e'}}>{translator.email}</a></p>
                    <button
                        className='btns-partner wawes-effect wawes-light'
                        onClick={handleDelete}>
                        Изменить
                    </button>
                    <button className='btns-partner wawes-effect wawes-light' onClick={toggleComment}>
                        Комментарий
                    </button>
                    {isCommentVisible &&
                    <div className='comment-block'>
                        <input type='text' value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button
                            className='btns-partner wawes-effect wawes-light'
                            onClick={() => {
                            localStorage.setItem(`comment-${id}`, comment);
                            setComment('');
                        }}>Сохранить комментарий</button>
                        {localStorage.getItem(`comment-${id}`) &&
                        <div>
                            <p style={{marginTop: "5px", marginBottom: "5px"}}>Комментарий:</p>
                            <p>{localStorage.getItem(`comment-${id}`)}</p>
                        </div>
                        }
                    </div>
                    }
                </div>
    );
}

export default AuthUser;
