// app/main/page.js
"use client";

import Image from 'next/image';
import Link from 'next/link';
import TradingViewTicker from '@/components/TradingViewTicker';
import TradingViewRealtime from '@/components/TradingViewRealtime';
import RealTimePriceCard from '@/components/RealTimePriceCard';

export const runtime = 'edge'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <main>
        {/* Hero Section */}
        <section className="w-full bg-white dark:bg-gray-700 border-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl text-neutral-950 font-bold mb-4">
                일확천금에 오신 것을 환영합니다.
                {/*Welcome to IlHwakCheonGuem*/}
              </h1>
              <p className="text-gray-700 rounded-md font-medium transition-colors duration-200 text-center mb-6">
                저희 플랫폼에서 암호화폐를 안전하고 효율적으로 거래하세요.
                {/*Trade cryptocurrencies securely and efficiently on our advanced platform.*/}
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/mail" className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[var(--color-button-orange)] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[var(--color-theme-orange)]">
                  시작하기
                  {/*Get Started*/}
                </Link>
                <Link href="/learn" className="text-gray-700 inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100">
                  시작 알아보기
                  {/*Learn More*/}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cryptocurrencies Section */}
        <section className="w-full py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl text-neutral-950 font-bold mb-8 text-center">
              인기 암호화폐를 확인하세요.
              {/*Popular Cryptocurrencies*/}
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex flex-wrap justify-center gap-6">
              <RealTimePriceCard 
                symbol="btcusdt" 
                name="Bitcoin (BTC)"
              />
              <RealTimePriceCard 
                symbol="ethusdt" 
                name="Ethereum (ETH)"
              />
              <RealTimePriceCard 
                symbol="dogeusdt" 
                name="IlHwakCheonGuem (GRQ)"
              />
            </div>
              <TradingViewTicker />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl text-neutral-950 font-bold mb-8 text-center">
              왜 일확천금을 선택해야 할까요?
              {/*Why Choose IlHwakCheonGuem?*/}
            </h1>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 4-4 4 4"></path>
                    <path d="m3 15 4 4 4-4"></path>
                    <path d="M13 6h5a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5"></path>
                    <path d="M13 18V6"></path>
                  </svg>
                  <h2 className="text-gray-700 text-xl font-bold">빠른 환전{/*Fast Transactions*/}</h2>
                </div>
                <div className="text-gray-700 px-6 py-4">
                  <p>저희 고성능 플랫폼에서 신속하고 효율적으로 거래하세요.
                    {/*Execute trades quickly and efficiently on our high-performance platform.*/}</p>
                </div>
              </div>
              
              <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <h2 className="text-gray-700 text-xl font-bold">안전한 보관{/*Secure Storage*/}</h2>
                </div>
                <div className="text-gray-700 px-6 py-4">
                  <p>고객님의 자산은 최신 보안 기술로 안전하게 보호됩니다.{/*Your assets are protected with state-of-the-art security measures.*/}</p>
                </div>
              </div>
              
              <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-sm flex-1 min-w-[250px]">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                  <h2 className="text-gray-700 text-xl font-bold">24시간 지원{/*24/7 Support*/}</h2>
                </div>
                <div className="text-gray-700 px-6 py-4">
                  <p>저희 전담 팀이 언제나 고객님의 문제 해결을 도와드립니다.{/*Our dedicated team is always available to assist you with any issues.*/}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
}
