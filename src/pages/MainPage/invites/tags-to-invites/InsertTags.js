
const InsertTags = (tags) => {
    console.log('tags');
    const insert = (word) => {
        let inp = document.querySelector('.add-input');
        let start = inp.selectionStart;
        inp.value = inp.value.substring(0, start) + word + inp.value.substring(inp.selectionEnd, inp.value.length)
        inp.focus();
        inp.setSelectionRange(start, start + word.length)
    }

    switch (tags) {
        case 'button__name':
            insert ('%Name% ');
            break
        case 'button__firstName':
            insert ('%firstName% ');
            break
        case 'button__city':
            insert ('%City% ');
            break
        case 'button__age':
            insert ('%Age% ');
            break
        case 'button__country':
            insert ('%Country% ');
            break
        default:
            break
    }
}

export default InsertTags;
