import { useState, useEffect } from 'react';

export function useTradingViewPrice(symbol) {
  const [price, setPrice] = useState(null);
  const [change, setChange] = useState(null);
  const [changePercent, setChangePercent] = useState(null);

  useEffect(() => {
    // Binance WebSocket을 통한 실시간 가격 (대안 방법)
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`);
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(parseFloat(data.c)); // 현재 가격
      setChange(parseFloat(data.P)); // 24시간 변동률
      setChangePercent(parseFloat(data.P)); // 24시간 변동률 퍼센트
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return { price, change, changePercent };
}