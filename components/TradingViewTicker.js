// components/TradingViewTicker.js
"use client";

import { useEffect, useRef } from 'react';

export default function TradingViewTicker() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "BINANCE:BTCUSDT",
          title: "Bitcoin"
        },
        {
          proName: "BINANCE:ETHUSDT", 
          title: "Ethereum"
        },
        {
          proName: "BINANCE:ADAUSDT",
          title: "Cardano"
        },
        {
          proName: "BINANCE:BNBUSDT",
          title: "BNB"
        },
        {
          proName: "BINANCE:SOLUSDT",
          title: "Solana"
        }
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "kr"
    });

    if (tickerRef.current) {
      tickerRef.current.appendChild(script);
    }

    return () => {
      if (tickerRef.current) {
        tickerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full mb-8">
      <div 
        ref={tickerRef}
        className="tradingview-widget-container"
      >
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}