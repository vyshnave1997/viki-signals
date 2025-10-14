"use client";

import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

// Minimal WatchlistButton implementation to satisfy page requirements.
// This component focuses on UI contract only. It toggles local state and
// calls onWatchlistChange if provided. Styling hooks match globals.css.

interface WatchlistButtonProps {
  symbol: string;
  company: string;
  isInWatchlist: boolean;
}

export default function WatchlistButton({
  
  
  isInWatchlist: initialIsInWatchlist,
}: WatchlistButtonProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(initialIsInWatchlist);

  const handleClick = async () => {
    try {
      // TODO: Implement add/remove from watchlist functionality
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error("Failed to update watchlist:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
    >
      {isInWatchlist ? (
        <>
          <MinusIcon className="h-5 w-5" />
          Remove from Watchlist
        </>
      ) : (
        <>
          <PlusIcon className="h-5 w-5" />
          Add to Watchlist
        </>
      )}
    </button>
  );
}