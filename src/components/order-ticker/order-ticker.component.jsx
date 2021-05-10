import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserOrdersValues } from '../../firebase/firebase.utils';
import { cancelOrder } from '../../redux/order/order.action';

const OrderTicker = ({ orderValues }) => {
    const { status, currency, crypto, price, amount, type, createdAt, total, symbol, id } = orderValues
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch();
    const [spanProperties, setSpanProperties] = useState({
        display: 'hidden',
        z: 'z-0',
        right: '-right-1/3',
        visible: 'invisible'
    })

    const handleMouseEnter = () => {
        setSpanProperties({
            display: 'flex flex-row',
            z: 'z-20',
            right: 'right-0',
            opacity: 'opacity-1',
            visible : 'visible'
        })
    }
    const handleMouseLeave = () => {
        setSpanProperties({
            display: 'hidden',
            z: 'z-0',
            right: '-right-1/3',
            visible: 'invisible'

        })

    }
    const handleCancel = async() =>{
        let cancelledOrder = [{
            ...orderValues,
            status : 'cancelled'
        }]
        await updateUserOrdersValues(currentUser.id,cancelledOrder);
        dispatch(cancelOrder(cancelledOrder))

    }

    return (
        <div className={`flex flex-row border relative py-1 border-gray-200 justify-between z-10 ${type === 'buy' ? 'shadow-buy-ticker-active' : 'shadow-sell-ticker-active'} ${status === 'complete' ? (type === 'buy' ? 'bg-green-100' : 'bg-red-100') : null} `}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <div className='flex flex-col px-2 uppercase' >
                <span className='text-sm font-medium text-gray-700 border-b border-gray-300 mx-auto' >{symbol}</span>
                <span className='text-xs font-normal text-gray-500 mx-auto ' >{currency}</span>
            </div>
            <div className='flex flex-col px-1 w-2/6 ' >
                <span className='text-sm font-medium text-gray-700 mx-auto' >{amount}</span>
                <span className='text-xs font-normal text-gray-500 border-t border-gray-300 mx-auto ' >{amount}</span>
            </div>
            <span className='w-1/5 text-sm font-normal my-auto ' >{price}</span>
            <span className='w-1/5 text-sm font-semibold my-auto mr-1' >{total}</span>
            <div className={`slider-div h-full w-2/3 text-center text-xs bg-gray-400 ${spanProperties.opacity} ${spanProperties.display} ${spanProperties.z} ${spanProperties.right} items-center justify-evenly space-x-2 `}  >
            <span  >{createdAt && createdAt.toDate().toDateString() } </span>
            {
                status ==='open'
                ?
            <span onClick={handleCancel} >Cancel</span>
            :
            <span className='capitalize' >{status}</span>
            }
            </div>
        </div>


    );
}

/*
div.sc-bdVaJa.sc-cMhqgX.jSoVPH {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-shrink: 0;
    height: 100%;
    width: 85%;
    opacity: 1;
    z-index: 2;
    background: linear-gradient(to right, rgba(245, 248, 250, 0) 0%, rgb(245, 248, 250) 10%);
    position: absolute;
    right: 0px;
    top: 0px;
    transition: all 0.2s ease 0s;
    justify-content: flex-end;
    align-items: center;
    color: rgb(155, 155, 155);
    cursor: default;
    font-weight: 600 !important;


}
}
*/

export default OrderTicker;