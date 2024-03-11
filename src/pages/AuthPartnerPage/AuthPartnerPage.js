import React, {useState, useContext} from "react";
import './AuthPartnerPage.scss'
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import '../MainPage/invites/invite-control/InviteControl.scss'
import {SERVER_NAME} from "../../server_name";

const AuthPartnerPage = () => {
    const [form, setForm] = useState({
        login: '',
        pass: ''
    });

    const {loginPartner} = useContext(AuthContext)

    const changeHandlerAdmin = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
        console.log(form);
    }

    // const registerPartner = async () => {
    //     try {
    //         await axios.post(`https://${SERVER_NAME}/registrationpartner`, {...form}, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(response => console.log(response))
    //
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const loginPartnerPage = async () => {
        try {
            await axios.post(`https://${SERVER_NAME}/partner`, {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                loginPartner(response.data.tokenAdmin, response.data.adminId, response.data.login, response.data.pass);
            });
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container" style={{height: "100%", width: "100%"}}>
                        <div className="auth-page">
                            <Route path={'/partner'}>
                                <h3 style={{color: '#fff'}}>Авторизация Админа</h3>
                                <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                    <div>
                                        <div className="input-field col s12">
                                            <input
                                                type="text"
                                                name='login'
                                                className='validate'
                                                onChange={changeHandlerAdmin}/>
                                            <label htmlFor="password">Login</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input
                                                type="password"
                                                name='pass'
                                                className='validate'
                                                onChange={changeHandlerAdmin}
                                            />
                                            <label htmlFor="email">Password</label>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            id={'login-app-admin'}
                                            className='btn-start-invite wawes-effect wawes-light'
                                            onClick={loginPartnerPage}
                                        >
                                            Войти
                                        </button>
                                        {/*<Link to="/registrationpartner" className="btn-outline btn-reg" style={{color: '#fff'}}>Нет аккаунта?</Link>*/}
                                    </div>
                                </form>
                            </Route>


                            {/*/////----Регистрация админа - временно убрали!-------*/}

                            {/*<Route path={'/registrationpartner'}>*/}
                            {/*    <h3 style={{color: '#fff'}}>Регистрация Админа</h3>*/}
                            {/*    <form className='form form-login' onSubmit={e => e.preventDefault()}>*/}
                            {/*        <div>*/}
                            {/*            <div className="input-field col s12">*/}
                            {/*                <input*/}
                            {/*                    type="text"*/}
                            {/*                    name='login'*/}
                            {/*                    className='validate'*/}
                            {/*                    onChange={changeHandlerAdmin}/>*/}
                            {/*                <label htmlFor="password">Login</label>*/}
                            {/*            </div>*/}
                            {/*            <div className="input-field col s12">*/}
                            {/*                <input*/}
                            {/*                    type="password"*/}
                            {/*                    name='pass'*/}
                            {/*                    className='validate'*/}
                            {/*                    onChange={changeHandlerAdmin}/>*/}
                            {/*                <label htmlFor="email">Password</label>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div>*/}
                            {/*            <button*/}
                            {/*                className='btn-start-invite wawes-effect wawes-light'*/}
                            {/*                onClick={registerPartner}*/}
                            {/*            >*/}
                            {/*                Регистрация*/}
                            {/*            </button>*/}
                            {/*            <Link to="/partner" className="btn-outline btn-reg" style={{color: '#fff'}}>Уже есть аккаунт?</Link>*/}
                            {/*        </div>*/}
                            {/*    </form>*/}
                            {/*</Route>*/}

                        </div>
                    </div>

                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPartnerPage;
