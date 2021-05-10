import { createStore , applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './root-reducer';


const middlewares = [];

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middlewares)));

export default store;