import React from "react";
import {useContext} from "react";
import './Nacbar.scss'
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext);

    return (
        <nav style={{border: "2px white"}}>
            <div className="nav-wrapper navbar">
                <a href="https://login.romancecompass.com/myprofile/" className="brand-logo" target="_blank">RomanceCompass</a>
                {
                    isLogin ?
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li> <a href='https://login.romancecompass.com/myprofile/' style={{color: '#fff'}} target="_blank">ГЛАВНАЯ</a></li>
                            <li> <a href='https://login.romancecompass.com/search/' style={{color: '#fff'}} target="_blank">ШАБЛОНЫ</a></li>
                            <li> <a href='https://login.romancecompass.com/about-us/' style={{color: '#fff'}} target="_blank">МАССОВАЯ РАССЫЛКА</a></li>
                            <li> <a href='https://login.romancecompass.com/chat/#home' style={{color: '#fff'}} target="_blank">В ЧАТ</a></li>
                            <li><a href="/" onClick={logout} style={{color: '#fff'}}>ВЫЙТИ</a></li>
                        </ul>
                        :
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="https://romancecompass.com/partner/" style={{color: '#fff'}}>ВХОД АДМИНА</a></li>
                            <li><a href="https://login.romancecompass.com/" style={{color: '#fff'}}>ВХОД ПЕРЕВОДЧИКА</a></li>
                        </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar;
