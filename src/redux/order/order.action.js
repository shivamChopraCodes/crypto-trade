import OrderActionTypes from "./order.types"

export const setOrders = (orders) =>({
    type : OrderActionTypes.SET_ORDERS,
    payload : orders
})

export const addNewOrder = (newOrder) =>({
    type : OrderActionTypes.ADD_NEW_ORDER,
    payload : newOrder
})

export const cancelOrder = (order) =>({
    type : OrderActionTypes.CANCEL_ORDER,
    payload : order
})

export const completeOrder = (orders) =>({
    type : OrderActionTypes.COMPLETE_ORDER,
    payload : orders
})