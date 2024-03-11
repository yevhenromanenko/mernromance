

const WriteLetterAfterChat = (userId, setStartElement) => {
    console.log(userId, 'userId чекаем айди при нажатии написать письмо');
    const url = `https://login.romancecompass.com/letters/#write/${userId}`;
    window.open(url, '_blank');
    setStartElement(false);
};

export default WriteLetterAfterChat;
