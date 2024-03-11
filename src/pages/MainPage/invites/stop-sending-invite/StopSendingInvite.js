

const StopSendingInvite = (setIsSending, intervalId, setIntervalId, setIsWaiting, setWaitSeconds) => {
    setIsSending(false);
    clearInterval(intervalId);
    setIntervalId(null);
    setIsWaiting(false); // сбрасываем переменную состояния isWaiting
    setWaitSeconds(null); // сбрасываем время ожидания
};

export default StopSendingInvite;
