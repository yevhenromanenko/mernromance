
const StopBotAutoAnswer = (stopBot, setIsSending, intervalId, setIntervalId, setIsWaiting, setWaitSeconds) => {
    stopBot = true;

    window.scrollTo({
        top: window.pageYOffset + 1000,
        behavior: 'smooth',
    });

    setIsSending(false);
    clearInterval(intervalId);
    setIntervalId(null);
    setIsWaiting(false); // сбрасываем переменную состояния isWaiting
    setWaitSeconds(null);

    console.log(stopBot, 'stopBot in stopBotExecution button')
}

export default StopBotAutoAnswer;
