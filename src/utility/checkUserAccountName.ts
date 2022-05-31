const checkUserAccountName = (name: string) => {
    if (!name) return false;

    // check if account name between 3 to 20 character  and contain only characters
    if (name.trim().length < 3 || name.trim().length > 20) return false;

    return true;
};

export default checkUserAccountName;
