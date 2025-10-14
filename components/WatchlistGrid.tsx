'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrashIcon } from '@heroicons/react/24/outline';
import { removeFromWatchlist } from '@/lib/actions/watchlist.actions';

interface WatchlistStock {
  symbol: string;
  company: string;
}

interface WatchlistGridProps {
  stocks: WatchlistStock[];
}

export default function WatchlistGrid({ stocks }: WatchlistGridProps) {
  const [watchlistStocks, setWatchlistStocks] = useState(stocks);

  const handleRemove = async (symbol: string) => {
    try {
      await removeFromWatchlist(symbol);
      setWatchlistStocks(prev => prev.filter(stock => stock.symbol !== symbol));
    } catch (error) {
      console.error('Failed to remove stock:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {watchlistStocks.map((stock) => (
        <div
          key={stock.symbol}
          className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
        >
          <Link 
            href={`/stocks/${stock.symbol}`}
            className="flex-1"
          >
            <h3 className="text-lg font-semibold text-gray-100">
              {stock.symbol}
            </h3>
            <p className="text-sm text-gray-400">{stock.company}</p>
          </Link>
          
          <button
            onClick={() => handleRemove(stock.symbol)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}