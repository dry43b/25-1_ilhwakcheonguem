"use client";

import { useTradingViewPrice } from '../hooks/useTradingViewPrice';

export default function RealTimePriceCard({ symbol, name, icon }) {
  const { price, changePercent } = useTradingViewPrice(symbol);

  return (
    <div className="rounded-xl border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow max-w-sm flex-1 min-w-[250px]">
      <div className="px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          {icon && <img src={icon} alt={name} className="w-6 h-6" />}
          <h2 className="text-gray-700 text-xl font-bold">{name}</h2>
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-lg font-semibold">
          ${price ? price.toLocaleString() : 'Loading...'}
        </p>
        <p className={`text-sm font-medium ${
          changePercent >= 0 ? 'text-green-500' : 'text-red-500'
        }`}>
          {changePercent ? `${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%` : 'Loading...'}
        </p>
      </div>
    </div>
  );
}