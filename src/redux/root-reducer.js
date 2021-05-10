import { combineReducers } from 'redux';
import cryptoReducer from './crypto/crypto.reducer';
import userReducer from './user/user.reducer';
import ordersReducer from './order/order.reducer'

const rootReducer = combineReducers({
    crypto : cryptoReducer,
    user : userReducer,
    orders : ordersReducer
})

export default rootReducer;