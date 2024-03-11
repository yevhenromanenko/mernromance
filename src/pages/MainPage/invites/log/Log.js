import React from 'react';
import '../invite-control/InviteControl.scss';

const LogItem = ({ personalInviteToSend, userExists, inviteToSend, randomUser }) => {

    const photoDeda = `https://login.romancecompass.com/${randomUser.photo_m_src}`
    const nullPhoto = 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png'
    const srcPhotoDeda = randomUser.photo_m_src === null ? nullPhoto : photoDeda;

    return (
        <div className="__row">
            <div className="img_in_log">
                <img src={srcPhotoDeda} className="ava_in_log" alt="" />
            </div>
            <div className="msg_in_log">
                <div className="invite_text_in_log">{userExists ? personalInviteToSend : inviteToSend}</div>
                <div className="invite_info_in_log">
                    {randomUser.name} -{' '}
                    <a
                        href={`https://login.romancecompass.com/man/${randomUser.id}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ded_id_in_log"
                    >
                        {randomUser.id}
                    </a>
                    <span className="country_in_log"> {randomUser.country}</span>
                </div>
            </div>
        </div>
    );
};

export default LogItem;
