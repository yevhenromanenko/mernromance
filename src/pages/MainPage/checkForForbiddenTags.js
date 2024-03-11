
const CheckForForbiddenTags = (text) => {
    const forbiddenTags = ["%Name%", "%firstName%", "%Age%", "%Country%", "%City%", "&", "%", "[yes-photo]"];
    return forbiddenTags.some((tag) => text.includes(tag));
};

export default CheckForForbiddenTags;
