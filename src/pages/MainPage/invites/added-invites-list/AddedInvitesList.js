import AddedInvites from "../added-invites/AddedInvites";
import './AddedInvitesList.scss';
import '../added-invites/AddedInvites.scss'
import DeleteGlobalInviteFromServer from "../delete-global-invite-from-server/DeleteGlobalInviteFromServer";
import DeletePersonalInviteFromServer from "../delere-personal-invite-from-server/DeletePersonalInviteFromServer";

const AddedInvitesList = ({inviteBD, setInviteBD, invitePersonalBD, setInvitePersonalBD}) => {

    const allAddedInvites = inviteBD.length;
    const allAddedPersonalInvites = invitePersonalBD.length;

    const invites = inviteBD.map(item => {
        const {id, ...ItemProps} = item;
        return  (
            <AddedInvites
                key={id}
                {...ItemProps}
                onDelete={() => DeleteGlobalInviteFromServer(id, inviteBD, setInviteBD)}
            />
        )
    })

    const invitesPersonal = invitePersonalBD.map(item => {
        const {id, smile, ...ItemProps} = item;
        return  (
            <AddedInvites
                key={id}
                smile={smile}
                {...ItemProps}
                onDelete={() => DeletePersonalInviteFromServer(id, invitePersonalBD, setInvitePersonalBD)}
            />
        )
    })

    return (
        <>
            <h3 className={'h3-your-invites'}>Ваши инвайты: {allAddedInvites}, Инвайты постояльцам: {allAddedPersonalInvites}</h3>
            <ul className="app-list list-group invite__items list-group list-group-flush">
                {invites}
                {invitesPersonal}
            </ul>
        </>

    )
}

export default AddedInvitesList;
