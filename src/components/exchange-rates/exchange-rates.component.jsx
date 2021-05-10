import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCrypto } from '../../redux/crypto/crypto.actions';
import { currencySplitter } from '../../util';
import TickerItem from '../ticker-item/ticker-item.component';



const ExchangeRates = ({urlCurrency}) => {
    const dispatch = useDispatch();
    const [crypto,currency] = currencySplitter(urlCurrency);
    console.log(crypto,currency);
    const [currencies, setCurrencies] = useState(null);
    const [activeHeader, setActiveHeader] = useState(currency);
    const fetchData = async () => {
        await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(data => {
                setCurrencies((prev) => ({
                    inr: [...data.data]
                }))
                dispatch({type: 'UPDATE_CRYPTO', payload :{inr : [...data.data]} })
            });

        await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(data => {
                setCurrencies((prev) => ({
                    ...prev,
                    usd: [...data.data]
                }))
                dispatch(updateCrypto({usd: [...data.data]}))

            });
    }

    const handleActiveHeaderChange = (e) =>{
        setActiveHeader(e.target.dataset.type);
        console.log(`active header state = ${activeHeader}`)
    }

    useEffect(() => {
        !currencies && fetchData();
    })
    console.log(currencies)
    return (
        <div className=' w-1/5 flex flex-col items-center h-auto' >
            <div className='exchange-header w-11/12 flex flex-row space-x-0  pb-2 border-t border-gray-300 bg-gray-50' >
                <div onClick={(e)=>handleActiveHeaderChange(e)} data-type='fav' className={`w-1/3 py-2 text-center border border-r-0 border-t-0 border-transparent border-gray-300 ${ activeHeader === 'fav' ? 'border-b-0  bg-gray-50 shadow-header-active  font-bold' : 'bg-gray-200'}`}>Fave</div>
                <div onClick={(e)=>handleActiveHeaderChange(e)} data-type='inr' className={`w-1/3 py-2 text-center border border-r-0 border-t-0 border-transparent border-gray-300 ${ activeHeader === 'inr' ? 'border-b-0  bg-gray-50 shadow-header-active font-bold' : 'bg-gray-200'}`}>INR</div>
                <div onClick={(e)=>handleActiveHeaderChange(e)} data-type='usd' className={`w-1/3 py-2 text-center border border-t-0 border-transparent border-gray-300 ${ activeHeader === 'usd' ? 'border-b-0  bg-gray-50 shadow-header-active font-bold' : 'bg-gray-200'}`}>USD</div>
                </div>
            <div className='currencies w-11/12 h-5/6 overflow-y-scroll overflow-x-hidden rounded-b-md bg-gray-50' >
              {
                activeHeader !== 'fav' && currencies && currencies[activeHeader]
                  ?
                  currencies[activeHeader].map(currentCurrency => <TickerItem key={currentCurrency.id} crypto={currentCurrency} currency={activeHeader} active ={urlCurrency === `${currentCurrency.id}-${activeHeader}` ? true : false } /> ) 
                  :
                  null
              }
            </div>
        </div>
    )
}

export default ExchangeRates;