const checkPassword = (input: string | undefined) => {
    if (!input || typeof input == undefined) return false;

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return regex.test(input.trim());
};

export default checkPassword;
