import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { firestore, getOrders, updateUserOrdersValues } from '../../firebase/firebase.utils';
import { completeOrder, setOrders } from '../../redux/order/order.action';
import OrderTicker from '../order-ticker/order-ticker.component';

const DisplayOrders = ({ urlCurrency }) => {
  const [activeHeader, setActiveHeader] = useState('open');
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders);
  const currentUser = useSelector(state => state.user.currentUser);

  const fetchData = () => {
    let storiesref = firestore.collection(`users/${currentUser.id}/orders`).orderBy('createdAt','desc');
    storiesref.get().then(async snapshot => {
      if (snapshot.docs.length) {
        let sortedArray = getOrders(snapshot);
        dispatch(setOrders(sortedArray))
      }
    });
  }

  const handleActiveHeaderChange = (e) => {
    setActiveHeader(e.target.dataset.type);
  }
  const completeOrders = async () => {
    if (orders.open.length > 0) {
      let completedOrders = orders.open.map(order => ({
        ...order,
        status: 'complete'
      }))

      await updateUserOrdersValues(currentUser.id, completedOrders);
      dispatch(completeOrder(completedOrders));
    }

  }

  useEffect(() => {
    currentUser && !orders.closed.length && fetchData();
    console.log(orders.open);
    const timer = setTimeout(async () => {
      completeOrders()
    }, 15000)

    return () => clearTimeout(timer)
  }, [currentUser, orders])
  return (
    <div className='flex flex-col items-center bg-gray-50 w-11/12 rounded-sm ' >

      <div className=' display-order-header w-full flex flex-row space-x-0  pb-2 border-t border-gray-300 bg-gray-50'   >
        <div onClick={handleActiveHeaderChange} data-type='open' className={`w-1/2 py-2 text-center border border-r-0 border-t-0 border-gray-300 ${activeHeader === 'open' ? 'border-b-0  bg-gray-50 shadow-buy-header-active  font-bold' : 'bg-gray-200'}`}>OPEN ORDERS</div>
        <div onClick={handleActiveHeaderChange} data-type='closed' className={`w-1/2 py-2 text-center border border-t-0 border-transparent border-gray-300 ${activeHeader === 'closed' ? 'border-b-0  bg-gray-50 shadow-buy-header-active font-bold' : 'bg-gray-200'}`}>CLOSED ORDERS</div>
      </div>
      <div className='w-full bg-gray-50 h-72 flex flex-col overflow-y-auto text-center ' >
        <div className='flex flex-row w-full justify-between border border-gray-200' >
          <div className='flex flex-col px-1 uppercase' >
            <span className='text-xs font-normal text-gray-700 mx-auto' >PAIR</span>
          </div>
          <div className='flex flex-col px-1 w-2/6 ' >
            <span className='text-xs font-norma text-gray-700 mx-auto' >AMOUNT</span>
          </div>
          <span className='w-1/5 text-xs font-normal my-auto ' >PRICE</span>
          <span className='w-1/5 text-xs font-norma my-auto' >RATE</span>
        </div>
        {
          orders[activeHeader].map(order => <OrderTicker key={order.id} orderValues={order} />)
        }
      </div>
    </div>
  );
}

export default DisplayOrders;