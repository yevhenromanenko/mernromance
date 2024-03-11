import React, {useState, useContext} from "react";
import './AuthPage.scss'
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import '../MainPage/invites/invite-control/InviteControl.scss'
import {SERVER_NAME} from "../../server_name";

const AuthPage = () => {

    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
        console.log(form);
    }

    const loginHandler = async () => {
        try {
            await axios.post(`https://${SERVER_NAME}/login`, {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                login(response.data.token, response.data.userId, response.data.email, response.data.password);
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
                           <Route path={'/login'}>
                               <h3 style={{color: '#fff'}}>Авторизация</h3>
                               <form className='form form-login' onSubmit={e => e.preventDefault()}>
                                   <div>
                                       <div className="input-field col s12">
                                           <input
                                               type="email"
                                               name='email'
                                               className='validate'
                                               onChange={changeHandler}
                                               onFocus={() => setEmailFocused(true)}
                                               onBlur={() => setEmailFocused(false)}
                                               placeholder={emailFocused ? "" : "Email"}/>
                                           {/*<label htmlFor="password">Email</label>*/}
                                       </div>
                                       <div className="input-field col s12">
                                           <input
                                               type="password"
                                               name='password'
                                               className='validate'
                                               value={form.password}
                                               onChange={changeHandler}
                                               onFocus={() => setPasswordFocused(true)}
                                               onBlur={() => setPasswordFocused(false)}
                                               placeholder={passwordFocused ? "" : "Password"}
                                           />
                                           {/*<label htmlFor="email">Password</label>*/}
                                       </div>
                                   </div>
                                   <div>
                                       <button
                                           id={'login-app-user'}
                                           className='btn-start-invite wawes-effect wawes-light'
                                           onClick={loginHandler}
                                       >
                                           Войти
                                       </button>
                                       {/*<Link to="/registration" className="btn-outline btn-reg" style={{color: '#fff'}}>Нет аккаунта?</Link>*/}
                                   </div>
                               </form>
                           </Route>
                       </div>
                   </div>
               </React.Fragment>
           </Switch>
       </BrowserRouter>
    )
}

export default AuthPage;
