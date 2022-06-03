const checkAccountId = (ID: string) => {
    // check if id is string and number with regex and if it is not empty string and length is equal to 20
    const regex = /^[0-9a-zA-Z]{20}$/;

    if (typeof ID === "string" && ID.length === 20 && regex.test(ID)) {
        return true;
    }

    return false;
};

export default checkAccountId;
