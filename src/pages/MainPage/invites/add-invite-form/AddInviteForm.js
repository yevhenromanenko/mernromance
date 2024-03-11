import {useState} from "react";
import './AddInviteForm.scss'
import AddGlobalInviteToServer from "../add-global-invite-to-server/AddGlobalInviteToServer";
import AddPersonalInviteToServer from "../add-personal-invite-to-server/AddPersonalInviteToServer";

const AddInviteForm = ({inviteBD, setInviteBD, invitePersonalBD, setInvitePersonalBD}) => {

    const [invite, setInvite] = useState('');
    const [message, setMessage] = useState('')
    const [personalInvite, setPersonalInvite] = useState(false); // State для галочки

    const onValueChange = (e) => {
        setInvite([e.target.name] = e.target.value);
    }

    const onPersonalInviteChange = (e) => {
        setPersonalInvite(e.target.checked);
    }

    const AddNewInvite = async () => {

        if (invite.length < 5) {
            setMessage('!!Инвайт слишком короткий!!')
        } else if (invite.length > 80) {
            setMessage('!!Инвайт слишком длинный!!');
        } else {
            setMessage('')
            if (personalInvite) {
                await AddPersonalInviteToServer(invite, invitePersonalBD, setInvitePersonalBD);
            } else {
                await AddGlobalInviteToServer(invite, inviteBD, setInviteBD);
            }
        }
    }

    const addInvite = async (e) => {
        e.preventDefault();
        const inp = document.querySelector('.add-input');
        await AddNewInvite();
        setTimeout(() => {
            inp.value = '';
        }, 150)
        setInvite('')
    }

    return (
        <form
            className={'add-invite-form'}
        >
            <textarea
                type={'text'}
                id={'invite'}
                className={'form-control add-input'}
                name={'invite'}
                value={invite.value}
                placeholder={'Напишите новый инвайт'}
                onChange={onValueChange}
            />
            <div>
                <p>
                    <label>
                        <input
                            style={{border: "2px solid white"}}
                            type="checkbox"
                            id="indeterminate-checkbox"
                            checked={personalInvite}
                            onChange={onPersonalInviteChange}/>
                        <span style={{ position: 'relative' }}>
                          <style>
                            {`
                              [type="checkbox"]+span:not(.lever):before,
                              [type="checkbox"]:not(.filled-in)+span:not(.lever):after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 18px;
                                height: 18px;
                                z-index: 0;
                                border: 2px solid #ffffff;
                                border-radius: 1px;
                                margin-top: 3px;
                                -webkit-transition: .2s;
                                transition: .2s;
                              }
                            `}
                          </style>
                          Персональный инвайт
                        </span>
                    </label>
                </p>
            </div>
            <button
                type="submit"
                className="btn-outline-light add-new-invite"
                onClick={addInvite}
            >
                Добавить
            </button>
            <p className={'message-class'}>{message}</p>

        </form>
    )

}

export default AddInviteForm;
