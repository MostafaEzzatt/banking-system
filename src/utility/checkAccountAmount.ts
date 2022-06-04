const checkAccountAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0) return false;

    return true;
};

export default checkAccountAmount;
