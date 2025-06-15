'use client';

// pages/crypto-chart.js
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export const runtime = 'edge'

export default function CryptoChart() {
  useEffect(() => {
    // TradingView 스크립트가 로드된 후에 차트 초기화
    const loadTradingViewScript = () => {
      if (typeof TradingView !== 'undefined') {
        initChart();
      } else {
        // 스크립트가 아직 로드되지 않았다면 다시 시도
        setTimeout(loadTradingViewScript, 100);
      }
    };

    const initChart = () => {
      const select = document.getElementById('coinSelect');
      if (!select) return;
      
      loadChart(select.value);
      
      // 코인 선택 시 차트 업데이트
      select.addEventListener('change', (e) => {
        loadChart(e.target.value);
      });
    };

    let currentWidget;

    function loadChart(symbol) {
      if (currentWidget) {
        currentWidget.remove();
      }

      currentWidget = new TradingView.widget({
        container_id: "tradingview_chart",
        width: "100%",
        height: 800,
        symbol: symbol,
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "kr",
        toolbar_bg: "#1f2937",
        enable_publishing: false,
        hide_top_toolbar: false,
        withdateranges: true,
        save_image: false,
        studies: ["MACD@tv-basicstudies"],
      });
    }

    // 스크립트 로드 확인 시작
    loadTradingViewScript();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (currentWidget) {
        currentWidget.remove();
      }
    };
  }, []); // 빈 의존성 배열: 컴포넌트 마운트 시 한 번만 실행

  return (
    <>
      <Head>
        <title>Crypto Candle Chart</title>
        <meta charSet="UTF-8" />
      </Head>
      
      {/* TradingView 스크립트 로드 - Next.js Script 컴포넌트 사용 */}
      <Script
        src="https://s3.tradingview.com/tv.js"
        strategy="afterInteractive"
      />
      
      <div className="bg-gray-900 text-white font-sans p-5 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">코인 캔들 차트</h2>

        <label htmlFor="coinSelect" className="mr-3">코인 선택:</label>
        <select 
          id="coinSelect" 
          className="p-3 text-base mb-5 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="BINANCE:BTCUSDT">Bitcoin</option>
          <option value="BINANCE:ETHUSDT">Ethereum</option>
          <option value="BINANCE:SOLUSDT">Solana</option>
          <option value="BINANCE:XRPUSDT">Ripple</option>
          <option value="BINANCE:DOGEUSDT">GRQ (my coin)</option>
          <option value="BINANCE:ADAUSDT">Cardano</option>
          <option value="BINANCE:DOGEUSDT">Dogecoin</option>
          <option value="BINANCE:AVAXUSDT">Avalanche</option>
          <option value="BINANCE:MATICUSDT">Polygon</option>
          <option value="BINANCE:DOTUSDT">Polkadot</option>
          <option value="BINANCE:TRXUSDT">TRON</option>
        </select>

        <div className="tradingview-widget-container">
          <div 
            id="tradingview_chart" 
            className="w-full" 
            style={{ height: '800px' }}
          ></div>
        </div>
      </div>
    </>
  );
}