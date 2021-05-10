export const currencySplitter = (urlCurrency)=>{
    const urlCurrencyArray = urlCurrency.split('-');

    if(urlCurrencyArray.length === 0) return;
    let crypto,currency;
    if(urlCurrencyArray.length === 2){
        [crypto,currency] = urlCurrencyArray;
        return [crypto,currency];
    }
    if(urlCurrencyArray.length === 3){
        [crypto,currency] = [`${urlCurrencyArray[0]}-${urlCurrencyArray[1]}`,urlCurrencyArray[2]];
        return [crypto,currency];
    }
}