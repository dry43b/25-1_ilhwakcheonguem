"use client";

import { useEffect, useRef } from 'react';

export default function TradingViewRealtime() {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    // TradingView 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        // 기존 위젯이 있다면 제거
        if (widgetRef.current) {
          widgetRef.current.remove();
        }

        // 새 위젯 생성
        widgetRef.current = new window.TradingView.widget({
          container_id: containerRef.current.id,
          width: '100%',
          height: 400,
          symbol: 'BINANCE:BTCUSDT',
          interval: '1',
          timezone: 'Asia/Seoul',
          theme: 'light',
          style: '1',
          locale: 'kr',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          studies: [
            'Volume@tv-basicstudies'
          ],
          // 실시간 데이터 활성화
          datafeed: null, // 기본 datafeed 사용
          library_path: '/charting_library/',
          disabled_features: [
            'use_localstorage_for_settings',
            'volume_force_overlay'
          ],
          enabled_features: [
            'study_templates'
          ]
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // 클린업
      if (widgetRef.current) {
        widgetRef.current.remove();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4 text-center">실시간 차트</h3>
      <div 
        ref={containerRef}
        id="tradingview_chart"
        className="w-full"
      />
    </div>
  );
}