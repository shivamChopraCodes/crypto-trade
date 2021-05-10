import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserOrdersCollection } from '../../firebase/firebase.utils';
import { addNewOrder } from '../../redux/order/order.action';
import { currencySplitter } from '../../util';


const PlaceOrder = ({ urlCurrency }) => {
    const [activeHeader, setActiveHeader] = useState('buy');
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const [orderValues, setOrderValues] = useState({
        type: '',
        price: '',
        amount: 0,
        total: 0
    })
    const [crypto, currency] = currencySplitter(urlCurrency);
    const cryptoInfo = useSelector(state => state.crypto[currency].find(item => item.id === crypto))

    const fetchData = () => {

    }

    const onInputChange = (e) => {
        let value = e.target.value;
        let type = e.target.dataset.type;
        type === 'amount'
            ?
            setOrderValues(prev => ({
                ...prev,
                amount: value,
                total: Math.round(value * prev.price * 100) / 100
            }))
            :
            setOrderValues(prev => ({
                ...prev,
                amount: value / prev.price,
                total: value
            }))
    }

    const handleActiveHeaderChange = (e) => {
        setActiveHeader(e.target.dataset.type);
        setOrderValues(prev => ({
            ...prev,
            type: e.target.dataset.type
        }))
    }

    const handleSubmit = async (even) => {
        even.preventDefault();
        if (!orderValues.amount || !orderValues.total) return alert('Price and Total can\'t be 0 ');
        let id = await updateUserOrdersCollection(currentUser.id, orderValues);
        console.log(`orderID - ${id}`)
        dispatch(addNewOrder({ id, ...orderValues }))

        setOrderValues({
            type: activeHeader,
            price: cryptoInfo.current_price,
            status: 'open',
            crypto,
            currency,
            amount: 0,
            total: 0,
            symbol: cryptoInfo.symbol
        })

        console.log(orderValues);
    }

    useEffect(() => {

        if (cryptoInfo && cryptoInfo.current_price) {
            setOrderValues(prev => ({
                ...prev,
                type: activeHeader,
                price: cryptoInfo.current_price,
                status: 'open',
                crypto,
                currency,
                symbol: cryptoInfo.symbol


            }))
        }
    }, [urlCurrency, cryptoInfo, setOrderValues, activeHeader])

    return (
        <div className='flex flex-col items-center bg-gray-50 w-11/12 rounded-sm ' >
            <div className=' place-order-header w-full flex flex-row space-x-0  pb-2 border-t border-gray-300 bg-gray-50'   >
                <div onClick={handleActiveHeaderChange} data-type='buy' className={`w-1/2 py-2 text-center border border-r-0 border-t-0 border-gray-300 ${activeHeader === 'buy' ? 'border-b-0  bg-gray-50 shadow-buy-header-active  font-bold' : 'bg-gray-200'}`}>BUY</div>
                <div onClick={handleActiveHeaderChange} data-type='sell' className={`w-1/2 py-2 text-center border border-t-0 border-transparent border-gray-300 ${activeHeader === 'sell' ? 'border-b-0  bg-gray-50 shadow-sell-header-active font-bold' : 'bg-gray-200'}`}>SELL</div>
            </div>
            <div className='w-full bg-gray-50' >
                <form className=' flex flex-col items-center p-4 space-y-6 ' onSubmit={handleSubmit} >
                    <div className='w-full border border-gray-300 focus-within:ring-1 focus-within:ring-gray-500  rounded-md flex flex-row items-center py-1 space-x-1' tabIndex='0'>
                        <div className='text-right flex flex-col pr-1 my-auto border-r border-gray-300 w-1/5 ' >
                            <span className='text-xs text-right text-gray-500 font-medium' >AT PRICE</span>
                            <span className='text-sm text-right text-gray-500 font-semibold uppercase' >{currency}</span>
                        </div>
                        <input className='w-4/5 h-10 bg-gray-50 outline-none ' data-type='price' type="text" autoCapitalize="off" autoComplete="off" spellCheck="false" autoCorrect="off" inputMode="decimal" readOnly={true} value={!!orderValues.price && orderValues.price}></input>
                    </div>
                    <div className='w-full border border-gray-300 focus-within:ring-1 focus-within:ring-gray-500  rounded-md flex flex-row items-center py-1 space-x-1' tabIndex='0'>
                        <div className='text-right flex flex-col pr-1 my-auto border-r border-gray-300 w-1/5 ' >
                            <span className='text-xs text-right text-gray-500 font-medium' >AMOUNT</span>
                            <span className='text-sm text-right text-gray-500 font-semibold uppercase' >{cryptoInfo && cryptoInfo.symbol}</span>
                        </div>
                        <input onChange={onInputChange} className='w-4/5 h-10 bg-gray-50 outline-none ' data-type='amount' type="text" autoCapitalize="off" autoComplete="off" spellCheck="false" autoCorrect="off" inputMode="decimal" value={orderValues.amount}></input>
                    </div>
                    <div className='w-full border border-gray-300 focus-within:ring-1 focus-within:ring-gray-500  rounded-md flex flex-row items-center py-1 space-x-1' tabIndex='0'>
                        <div className='text-right flex flex-col pr-1 my-auto border-r border-gray-300 w-1/5 ' >
                            <span className='text-xs text-right text-gray-500 font-medium' >TOTAL</span>
                            <span className='text-sm text-right text-gray-500 font-semibold uppercase' >{currency}</span>
                        </div>
                        <input onChange={onInputChange} className='w-4/5 h-10 bg-gray-50 outline-none ' data-type='total' type="text" autoCapitalize="off" autoComplete="off" spellCheck="false" autoCorrect="off" inputMode="decimal" value={orderValues.total}></input>
                    </div>
                    <button type='submit' className={`w-full py-3 focus:outline-none rounded-md text-gray-50 uppercase ${activeHeader === 'buy' ? 'bg-green-500' : 'bg-red-600'} `} >{`${activeHeader} ${!!cryptoInfo && cryptoInfo.symbol}`}</button>
                </form>
            </div>
        </div>
    )
}

export default PlaceOrder;