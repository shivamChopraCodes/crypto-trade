import CryptoActionTypes from "./crypto.types";

export const updateCrypto = data => ({
    type : CryptoActionTypes.UPDATE_CRYPTO,
    payload : data
})