

const StopSendOnlineLetter = (setIsSending, sendInterval) => {
    setIsSending(false);
    clearInterval(sendInterval);
};

export default StopSendOnlineLetter;
