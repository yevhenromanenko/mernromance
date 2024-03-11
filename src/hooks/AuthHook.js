import {useState, useEffect, useCallback} from "react";
import axios from "axios";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [tokenAdmin, setAdminToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback(async (jwtToken, id, email, password) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))

        const data = new FormData();
        data.append('form_email', `${email}`);
        data.append('form_password', `${password}`);
        data.append('form_remember', `1`);
        data.append('try_to_log_in', `Y`);
        await axios.post('https://login.romancecompass.com/', data);

    }, [])

    const logout = async () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userData');
        return await axios.get('https://login.romancecompass.com/logout/');
    }

    const loginPartner = useCallback(async (jwtTokenAdmin, idAdmin, login, pass) => {
        setAdminToken(jwtTokenAdmin)
        setAdminId(idAdmin)

        localStorage.setItem('adminData', JSON.stringify({
            adminId: idAdmin,
            tokenAdmin: jwtTokenAdmin
        }))

        const dataPartner = new FormData();
        dataPartner.append('login', `${login}`);
        dataPartner.append('pass', `${pass}`);
        dataPartner.append('try_to_log_in', `%D0%92%D0%BE%D0%B9%D1%82%D0%B8`);
        await axios.post("https://romancecompass.com/partner/", dataPartner);

    }, [])

    const logoutAdmin = async () => {
        setAdminToken(null);
        setAdminId(null);
        localStorage.removeItem('adminData');
        return await axios.get('https://romancecompass.com/partner/logout/');
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        axios.get("https://login.romancecompass.com/").then(response => {
                if (data && data.token && !response.data.includes('E-mail')){
                    console.log(`Слово 'E-mail' не найдено на странице, поэтому мы залогинены!`);
                    login(data.token, data.userId)
                } else {
                    console.log(`Пользователь не залогинен!`);
                }
        }).catch(error => console.log(error));

        setIsReady(true)
    }, [login])



    useEffect( () => {
        const data = JSON.parse(localStorage.getItem('adminData'))

        axios.get('https://romancecompass.com/partner/').then(response => {
            if (data && data.tokenAdmin && !response.data.includes('denied')){
                console.log(`Слово 'denied' не найдено на странице, поэтому мы залогинены!`);
                loginPartner(data.tokenAdmin, data.adminId)
            } else {
                console.log(`Админ не залогинен!`);
            }
        }).catch(error => console.log(error));

        setIsReady(true)
    }, [loginPartner])

    return {login, logout, token, userId, isReady, loginPartner, logoutAdmin, tokenAdmin, adminId}
}
