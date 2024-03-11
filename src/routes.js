import React from "react";
import './App.scss';
import {Switch, Route, Redirect} from "react-router-dom";
import Modal from "react-modal";

import Navbar from "./components/Navbar";
import MassLetters from "./pages/MassPage/MassLetters";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import AuthPartnerPage from "./pages/AuthPartnerPage/AuthPartnerPage";
import PartnerPage from "./pages/PartnerPage/PartnerPage";
import NavbarAdmin from "./components/NavbarAdmin";
import Templates from "./pages/MainPage/letters/templates/Templates";
import TemplatesForFirstLetter from "./pages/MainPage/letters/template-for-first-letter/TemplateForFirstLetter";

export const useRoutes = (isLogin) => {

            if (isLogin) {

                if (window.location.href.includes('myprofile')) {
                    return (
                        <>
                            <Navbar/>
                            <script>
                                {document.title = "Главная"}
                            </script>
                        </>
                    );
                } else if (window.location.href.includes('write')) {
                    return (
                        <>
                            <Navbar/>
                            <TemplatesForFirstLetter/>
                            <script>
                                {document.title = "Отправка письма"}
                            </script>
                        </>
                    )
                } else if (window.location.href.includes('search')) {
                    return (
                        <div className="overlay">
                            <Navbar/>
                            <Templates/>
                            <script>
                                {document.title = "Шаблон письма"}
                            </script>
                        </div>
                    )
                } else if (window.location.href.includes('chat') && !window.location.href.includes('chat_onliner')) {
                    return (
                        <>
                            <Navbar/>
                            <MainPage/>
                            <script>
                                {document.title = "Чат"}
                            </script>
                        </>
                    )
                } else if (window.location.href.includes('about-us')) {
                    return (
                        <div className="overlay">
                            <Navbar/>
                            <MassLetters/>
                            <script>
                                {document.title = "Массовая рассылка"}
                            </script>
                        </div>
                    )
                } else if (window.location.href === 'https://romancecompass.com/partner/') {
                    return (
                        <>
                            <NavbarAdmin/>
                            <PartnerPage/>
                            <script>
                                {document.title = "Админка"}
                            </script>
                        </>
                    )
                } else {
                    return null
                }
            }

    return (
        window.location.href === 'https://login.romancecompass.com/' ?
            <Modal
                className={'modal-app'}
                isOpen={true}
            >
                <Navbar />
                <Switch>
                    <Route path='/login' exact component={AuthPage}/>
                    <Redirect to='/login'/>
                </Switch>
                <script>
                    {document.title = "Авторизация"}
                </script>
            </Modal>
            :
            window.location.href === 'https://romancecompass.com/partner/'
                ? <Modal
                    className={'modal-app'}
                    isOpen={true}
                >
                    <NavbarAdmin />
                    <Switch>
                        <Route path='/partner' exact component={AuthPartnerPage}/>
                        <Redirect to='/partner'/>
                    </Switch>
                    <script>
                        {document.title = "Авторизация"}
                    </script>
                </Modal> : null
    )
}
