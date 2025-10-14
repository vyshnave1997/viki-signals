import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import WatchlistGrid from "@/components/WatchlistGrid";
import { getWatchlistStocks } from "@/lib/actions/watchlist.actions";

export default async function WatchlistPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const stocks = await getWatchlistStocks(session.user.email);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-100">My Watchlist</h1>
      </div>

      {stocks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No stocks in your watchlist yet.</p>
          <p className="text-gray-500 mt-2">
            Add stocks to track them in one place.
          </p>
        </div>
      ) : (
        <WatchlistGrid stocks={stocks} />
      )}
    </div>
  );
}