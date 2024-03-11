import React, { useEffect, useState } from "react";
import './MainPage.scss'
import AppInfo from "./info/info";
import TagsToInvites from "./invites/tags-to-invites/TagsToInvites";
import InsertTags from "./invites/tags-to-invites/InsertTags";
import AddInviteForm from "./invites/add-invite-form/AddInviteForm";
import AddedInvitesList from "./invites/added-invites-list/AddedInvitesList";
import InviteControl from "./invites/invite-control/InviteControl";
import ProfitLady from "./profit-lady/ProfitLady";
import ReqToSendLetter from "./letters/req-to-send-letter/ReqToSendLetter";
import UsersList from "./get-users/GetUsers";
import GetGlobalInvitesFromServer from "./invites/get-global-invite-from-server/GetGlobalInvitesFromServer";
import GetPersonalInvitesFromServer from "./invites/get-personal-invites-from-server/GetPersonalInvitesFromServer";

const MainPage = () => {

    const [tags, setTags] = useState('');
    const [inviteBD, setInviteBD] = useState([]);
    const [invitePersonalBD, setInvitePersonalBD] = useState([]);
    const users = UsersList();

    useEffect(() => {
        GetGlobalInvitesFromServer(setInviteBD);
        GetPersonalInvitesFromServer(setInvitePersonalBD);
    }, []);

    const onInsertTags = (tags) => {
        setTags(tags);
        InsertTags(tags)
    }


    return (
        <>
        <div className="row" style={{marginBottom: '1px'}}>
                <div className={'col s7 push-s5'} >
                    <InviteControl users={users}/>
                </div>

                <div className={'col s5 pull-s7'}>
                    <ProfitLady/>
                    <AppInfo/>
                    <TagsToInvites
                        tags={tags}
                        onInsertTags={onInsertTags}
                    />

                    <AddInviteForm
                        inviteBD={inviteBD}
                        invitePersonalBD={invitePersonalBD}
                        setInviteBD={setInviteBD}
                        setInvitePersonalBD={setInvitePersonalBD}
                    />
                    <AddedInvitesList
                        inviteBD={inviteBD}
                        invitePersonalBD={invitePersonalBD}
                        setInviteBD={setInviteBD}
                        setInvitePersonalBD={setInvitePersonalBD}
                    />
                </div>
        </div>
            <ReqToSendLetter
                users={users}
            />
      </>
    )
};

export default MainPage;
