import React from "react";
import {useContext} from "react";
import './Nacbar.scss'
import {AuthContext} from "../context/AuthContext";

const NavbarAdmin = () => {
    const {logoutAdmin, isLogin} = useContext(AuthContext);

    return (
        <nav style={{border: "2px white"}}>
            <div className="nav-wrapper navbar">
                <a href="https://login.romancecompass.com/myprofile/" className="brand-logo">RomanceCompass</a>
                {
                    isLogin ?
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li> <a href='https://romancecompass.com/partner/' style={{color: '#fff'}}>ГЛАВНАЯ</a></li>
                            <li> <a href='https://romancecompass.com/partner/payout/' style={{color: '#fff'}}>ВЫПЛАТЫ</a></li>
                            <li><a href="https://romancecompass.com/partner/" onClick={logoutAdmin} style={{color: '#fff'}}>ВЫЙТИ</a></li>
                        </ul>
                        :
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="https://www.romancecompass.com/partner/" style={{color: '#fff'}}>ВХОД АДМИНА</a></li>
                            <li><a href="https://login.romancecompass.com/" style={{color: '#fff'}}>ВХОД ПЕРЕВОДЧИКА</a></li>
                        </ul>
                }
            </div>
        </nav>
    )
}

export default NavbarAdmin;
