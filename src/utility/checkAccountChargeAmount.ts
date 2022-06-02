const checkAccountChargeAmount = (amount: number) => {
    if (typeof amount !== "number" || amount <= 0) return false;

    return true;
};

export default checkAccountChargeAmount;
