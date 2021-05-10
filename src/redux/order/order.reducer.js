import OrderActionTypes from "./order.types";


const INITIAL_STATE = {
    open: [],
    closed: []
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OrderActionTypes.SET_ORDERS:
            return {
                ...state,
                open: [...action.payload.open],
                closed: [...action.payload.closed]
            }
        case OrderActionTypes.ADD_NEW_ORDER:
            return {
                ...state,
                open: [action.payload,...state.open]
            }
        case OrderActionTypes.COMPLETE_ORDER:
            return {
                ...state,
                open: [],
                closed : [...action.payload,...state.closed]
            }
            case OrderActionTypes.CANCEL_ORDER:
                return {
                    ...state,
                    open:(state.open.filter(order => order.id !== action.payload[0].id)),
                    closed : [...action.payload,...state.closed]
                }
        default:
            return state;
    }

}

export default ordersReducer;