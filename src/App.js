import React, {useEffect} from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom";
import {useRoutes} from "./routes";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/AuthHook";

function App() {

    const {login, logout, token, isReady, userId, adminId, tokenAdmin, logoutAdmin, loginPartner} = useAuth()
    const isLogin = !!token || !!tokenAdmin; // если токен есть то true, нет - false
    const routes = useRoutes(isLogin);


    useEffect(() => {
        const checkPage = () => {
            const currentPage = window.location.href;
            if (currentPage.includes('letters')) {
                document.body.classList.add('letters-page');
                document.body.classList.add('letters-page-strong');
                document.body.classList.add('letters-page-container');
            } else {
                document.body.classList.remove('letters-page');
                document.body.classList.remove('letters-page-strong');
                document.body.classList.remove('letters-page-container');
            }
        };

        checkPage();

        const handlePopState = () => {
            checkPage();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };

    }, []);


    return (
        <AuthContext.Provider value={{ login, logout, token, isReady, userId, isLogin, adminId, tokenAdmin, logoutAdmin, loginPartner }}>
        <div className="app">
            <BrowserRouter>
                {
                    routes
                }
            </BrowserRouter>
        </div>
        </AuthContext.Provider>
    );
}

export default App;
