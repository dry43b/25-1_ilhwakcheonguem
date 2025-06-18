"use client";

import { useEffect, useRef } from 'react';

export default function TradingViewMiniChart({ symbol = "BINANCE:BTCUSDT", width = "300", height = "200" }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: width,
      height: height,
      locale: "kr",
      dateRange: "12M",
      colorTheme: "light",
      isTransparent: false,
      autosize: false,
      largeChartUrl: ""
    });

    if (chartRef.current) {
      chartRef.current.appendChild(script);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, [symbol, width, height]);

  return (
    <div className="tradingview-widget-container">
      <div 
        ref={chartRef}
        className="tradingview-widget-container__widget"
      ></div>
    </div>
  );
}