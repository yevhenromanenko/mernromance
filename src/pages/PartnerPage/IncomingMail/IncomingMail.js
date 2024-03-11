import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IncomingMail.scss'


function IncomingMail() {
    const [mailCount, setMailCount] = useState(0);

    useEffect(() => {
        axios.get('https://romancecompass.com/partner/letter/')
            .then(response => {
                if (response.data.includes('ответить')) {
                    const count = (response.data.match(/ответить/g) || []).length;
                    setMailCount(count);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        mailCount > 0 ?
        <div className={'incoming-mail'}>
            <p>
                Входящие письма: {mailCount > 0 ? mailCount : null}
                <a href={'https://romancecompass.com/partner/letter/?filter[responsed]=0'}  style={{marginLeft: '10px', color: '#e09f3e', textDecoration: 'underline'}}>Ответить</a>
            </p>
        </div>
            : null
    );
}

export default IncomingMail;
