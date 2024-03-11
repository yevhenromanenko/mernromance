import './AddedInvites.scss';

const AddedInvites = (props) => {

    const {text, onDelete, onToggleRise, smile} = props;

    let classNames = "closest_invite list-group-item d-flex item-text-value";


    return (
        <li className={classNames}>
            <span className={'invite-text'} onClick={onToggleRise}>{text}</span>
            <div className='d-flex justify-content-center align-items-center'>
                {smile === true ? <i className="material-icons" style={{marginTop: '5px', marginRight: '5px', color: 'red'}}>favorite</i> : null}
                <button type="button"
                        className="material-icons deleteInvite"
                        onClick={onDelete}
                        id="#">
                    delete
                </button>
            </div>
        </li>
    )
}

export default AddedInvites;
