import './TagsToInvites.scss'

const TagsToInvites = (props) => {

    const buttonsData = [
        {name: 'button__name', label: 'И.Ф'},
        {name: 'button__firstName', label: 'Имя'},
        {name: 'button__city', label: 'Город'},
        {name: 'button__country', label: 'Страна'},
        {name: 'button__age', label: 'Возраст'},
    ];

    const buttons = buttonsData.map(({name, label}) => {
        return (
            <button
                className='btn-tags btn-outline-light'
                type={'button'}
                key={name}
                onClick={() => props.onInsertTags(name)}>
                {label}
            </button>
        )
    })

    return (
        <div className={'btn-group'}>
            {buttons}
        </div>
    )
}

export default TagsToInvites;
