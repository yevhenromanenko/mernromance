import './InviteControl.scss';
import ReqToSendInvite from "../request-to-send-invite/reqToSendInvite";

const InviteControl = ({users}) => {

    return (
        <div className="invite-control">
            <h2 className={'h2-invite-control'}>Управление рассылкой</h2>

            <div className={'info-about-users'}>
                <p className="on-off-send-invite"/>
                <p className="users-length"/>
            </div>

            <div className={'btn-start-stop'}>
                <ReqToSendInvite users={users}/>
            </div>
        </div>
    )
}

export default InviteControl;
