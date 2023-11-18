export const verifyUpiId = (upiId, setVerified, setError) => {
    const rgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;

    if (rgx.test(upiId)) {
        setVerified(true);
        setError(false);
    } else {
        setVerified(false);
        setError(true);
    }
};

export const validateCard = (cardNumber) => {
    const rgx = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13})$/;
    return { valid: rgx.test(cardNumber), issuer: getCardIssuer(cardNumber) };
};

const getCardIssuer = (cardNumber) => {
    const cardPatterns = [
        { issuer: "Visa", pattern: /^4[0-9]{12}(?:[0-9]{3})?$/ },
        { issuer: "MasterCard", pattern: /^5[1-5][0-9]{14}$/ },
        { issuer: "Discover", pattern: /^6(?:011|5[0-9][0-9])[0-9]{12}$/ },
        { issuer: "American Express", pattern: /^3[47][0-9]{13}$/ },
    ];

    for (const cardInfo of cardPatterns) {
        if (cardInfo.pattern.test(cardNumber)) {
            return cardInfo.issuer;
        }
    }

    return "";
};

export const handleMMChange = (value, year, setMonthError) => {
    if (Number(year)) {
        if (Number(year) === new Date().getFullYear() - 2000) {
            if (Number(value)) {
                if (Number(value) < new Date().getMonth() + 1) {
                    setMonthError(false);
                    return;
                }
            }
        }
    }
    setMonthError(true);
};

export const handleYYChange = (value, month, setMonthError) => {
    if (Number(value)) {
        if (Number(value) === new Date().getFullYear() - 2000) {
            if (Number(month)) {
                if (Number(month) < new Date().getMonth() + 1) {
                    setMonthError(false);
                    return;
                }
            }
        }
    }
    setMonthError(true);
};

export const handleCardNumber = (value, setData, setCardError) => {
    if (value.trim().length > 0) {
        const data = validateCard(value.replaceAll(" - ", ""));
        setCardError(data.valid);
        setData((prev) => {
            return { ...prev, cardIssuer: data.issuer };
        });
    } else {
        setCardError(true);
        setData((prev) => {
            return { ...prev, cardIssuer: "" };
        });
    }
};

export const splitStringIntoChunks = (str) => {
    const chunks = [];
    for (let i = 0; i < str.length; i += 4) {
        chunks.push(str.substr(i, 4));
    }
    return chunks;
};
