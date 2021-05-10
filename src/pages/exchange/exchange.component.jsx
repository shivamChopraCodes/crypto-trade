import React from 'react';
import Chart from '../../components/chart/chart.component';
import ExchangeRates from '../../components/exchange-rates/exchange-rates.component';
import Orders from '../../components/orders/orders.component';

const ExchangePage = ({ match }) => {
    console.log(match.params.currencies)

    return (
        <div className='exchange-page flex flex-row h-screen space-x-2 mt-2' >
            <ExchangeRates urlCurrency={match.params.currencies} />
            <div className='w-3/5' >
            <Chart urlCurrency={match.params.currencies} />
            </div>
            <Orders urlCurrency={match.params.currencies}/>
        </div>
    )
}

export default ExchangePage;