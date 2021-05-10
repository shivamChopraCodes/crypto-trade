import React, { useCallback, useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import axios from "axios";
import { currencySplitter } from "../../util";

const Chart = ({ urlCurrency }) => {
  const [crypto,currency] = currencySplitter(urlCurrency);
  const chartRef = useRef(null);
  const [prices, setPrices] = useState([]);
  // const [isloading, setIsLoading] = useState(true)
  let isloading = true;
  let currentChart = null;

  const setLineData = () => {
    let lineData = prices.map(price => ({
      time: (Math.floor(price[0] / 1000)),
      value: price[1]
    }))
    return lineData;

  }

  const fetchData = useCallback(async () => {
    console.log(`here  ${crypto}-${currency}`);
    await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=${currency}&days=1800`)
      .then(data => setPrices(data.data.prices))
      .catch(err => console.log(err));
      isloading = false;
  }, [crypto, currency])

  const chartSetter = () => {
    if(!prices.length) return;
    let lineData = setLineData()
    let d = new Date();
    d.setDate(d.getDate() - 90);
    d = new Date(d).toISOString().split('T')[0];
    const chart = createChart(chartRef.current, {
      width: 850,
      height: 615,
      layout: {
        textColor: '#d1d4dc',
        backgroundColor: '#000000',
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
      },
      crosshair: {
        vertLine: {
          width: 5,
          color: 'rgba(224, 227, 235, 0.1)',
          style: 0,
        },
        horzLine: {
          width: 5,
          color: 'rgba(224, 227, 235, 0.1)',
          style: 0,
        },
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
      },
    });
    currentChart = chart
    chart.applyOptions({
      layout: {
        backgroundColor: "#ffffff",
        textColor: "#696969"
      }
    })

    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(38, 198, 218, 0.56)',
      bottomColor: 'rgba(38, 198, 218, 0.04)',
      lineColor: 'rgba(38, 198, 218, 1)',
      lineWidth: 2,
      crossHairMarkerVisible: false,
    });

    areaSeries.setData(lineData);
    chart.timeScale().setVisibleRange({
      from: ((new Date(d)).toISOString()).split('T')[0],
      to: ((new Date().getTime())),
    });
    console.log('I ran')
  };
  console.log(prices);
  // !!prices.length && chartSetter();
  useEffect(() => {
    fetchData();

  }, [urlCurrency,fetchData])
  useEffect(() => {
    !!prices.length && chartSetter();
    return () => {
      if(currentChart){
        currentChart.remove();
        currentChart = null;
      }
    }
  })
  return (
    <div className='items-center justify-center w-full' >
      {
        prices.length
          ?
          <div className='' ref={chartRef} />
          :
          <div className=' flex items-center  justify-center h-96 w-full' >
            <svg className="animate-spin h-10 w-10 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      }
    </div>
  );
};

export default Chart;