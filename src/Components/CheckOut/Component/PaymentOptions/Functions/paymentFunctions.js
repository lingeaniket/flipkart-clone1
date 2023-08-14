export const verifyUpiId = (upiId, setVerified, setError) => {

    const rgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/

    if (rgx.test(upiId)) {
        setVerified(true);
        setError(false)
    } else {
        setVerified(false)
        setError(true)
    }
}

export const validateCard = (cardNumber) => {
    const rgx = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13})$/
    return {valid : rgx.test(cardNumber), issuer : getCardIssuer(cardNumber)}

}

const getCardIssuer = (cardNumber) => {
    const cardPatterns = [
        { issuer: 'Visa', pattern: /^4[0-9]{12}(?:[0-9]{3})?$/ },
        { issuer: 'MasterCard', pattern: /^5[1-5][0-9]{14}$/ },
        { issuer: 'Discover', pattern: /^6(?:011|5[0-9][0-9])[0-9]{12}$/ },
        { issuer: 'American Express', pattern: /^3[47][0-9]{13}$/ },
        // Add more card issuer patterns here
    ];

    for (const cardInfo of cardPatterns) {
        if (cardInfo.pattern.test(cardNumber)) {
            return cardInfo.issuer;
        }
    }

    return '';
};