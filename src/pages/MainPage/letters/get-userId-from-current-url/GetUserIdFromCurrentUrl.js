
const GetUserIdFromCurrentUrl = () => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    const userId = urlParts[urlParts.length - 1];
    return parseInt(userId);
};

export default GetUserIdFromCurrentUrl;
