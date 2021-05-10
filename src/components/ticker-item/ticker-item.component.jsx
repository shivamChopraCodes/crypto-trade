import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TickerItem = ({crypto,currency, active}) => {
    useEffect(()=>{
      if(active){
          document.title = `${currency === 'inr' ? '₹' : '$'}${crypto.current_price}: ${crypto.symbol}/${currency} ${crypto.price_change_percentage_24h > 0 ? '▲' :' ▼'} ${Math.round(crypto.price_change_percentage_24h*100)/100}%`
      }
    })
    return (
    <Link to={`/exchange/${crypto.id}-${currency}`} >
        <div className={`flex flex-row rounded-sm border-t-0 border-gray-300 justify-between items-center py-2 px-2 uppercase space-x-4 ${active ?'shadow-ticker-active bg-gray-300' : null} hover:bg-gray-200`} >
            <div className='flex flex-row px-1 space-x-4 items-center '  >
            <img className='w-4 h-4' src={crypto.image} alt={crypto.symbol} />
            <div className='flex flex-col' >
                <p className='text-xm' >{crypto.symbol}<span className='text-xs ' >/{currency}</span></p>
                <p className={`text-xs ${ crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-500' } `} >
                {crypto.price_change_percentage_24h > 0 ? '▲' :' ▼'} {Math.round(crypto.price_change_percentage_24h*100)/100}%
                </p>
            </div>
            </div>
            <div className='flex flex-row text-right px-1 ' >
            <p className='text-sm text-right font-semibold ' >{currency === 'inr' ? '₹' : '$'}{crypto.current_price}</p>
            </div>
        </div>
    </Link>
    )
}

export default memo(TickerItem);