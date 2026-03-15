export const milesToMeters = (miles) => {
    return miles * 1609.34
}

export const priceToDollar = (price) => {
    const iter = Math.floor(price / 25);
    let dollarSigns = 'Price: $';
    for (let i = 0; i < iter; i++) {
        dollarSigns += '$';
    }
    return dollarSigns;
};