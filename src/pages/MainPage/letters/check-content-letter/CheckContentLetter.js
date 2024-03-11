

const CheckContentLetter = (emailSubject, emailContent, selectedPhotoId) => {
    let isInvalid = false;

    if (typeof emailSubject === 'undefined' || emailSubject.length < 5) {
        alert('Тема слишком короткая');
        isInvalid = true;
    }

    if (typeof emailContent === 'undefined' || emailContent.length < 200) {
        alert('Письмо слишком короткое');
        isInvalid = true;
    }

    if (typeof selectedPhotoId === 'undefined' || !selectedPhotoId) {
        alert('Добавьте 1 фото к письму');
        isInvalid = true;
    }

    if (isInvalid) {
        return;
    }

    return true;
}

export default CheckContentLetter;
