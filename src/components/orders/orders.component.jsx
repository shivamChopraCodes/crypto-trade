import React from 'react';
import DisplayOrders from '../display-orders/display-orders.component';
import PlaceOrder from '../place-order/place-order.component';

const Orders = ({urlCurrency}) =>{

    return (
        <div className='flex flex-col w-1/3 space-y-6 items-center' >
          <DisplayOrders urlCurrency={urlCurrency} />
          <PlaceOrder urlCurrency={urlCurrency}/> 
        </div>
    )
}

export default Orders;