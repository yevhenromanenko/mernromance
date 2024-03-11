
const StopSendGlobalLetter = (setIsSendingGlobalLetter, sendIntervalGlobalLetter) => {
    setIsSendingGlobalLetter(false);
    clearInterval(sendIntervalGlobalLetter);
};

export default StopSendGlobalLetter;
