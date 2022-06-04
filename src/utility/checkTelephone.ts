const checkTelephone = (input: string | undefined) => {
    if (!input || typeof input == undefined) return false;

    const regex = /^\d{3}-\d{11}$/;
    return regex.test(input.trim());
};

export default checkTelephone;
