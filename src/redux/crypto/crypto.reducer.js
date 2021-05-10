import CryptoActionTypes from './crypto.types';

const INITIAL_STATE = {
    inr: [],
    usd: []
}

const cryptoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CryptoActionTypes.UPDATE_CRYPTO:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}

export default cryptoReducer;