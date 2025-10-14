'use server';

import { connectToDatabase } from '@/database/mongoose';
import Watchlist from '@/database/models/watchlist.model';

interface UserDocument {
  _id?: unknown;
  id?: string;
  email?: string;
}

interface WatchlistStock {
  symbol: string;
  company: string;
  addedAt: Date;
}

interface WatchlistDocument {
  stocks: WatchlistStock[];
}

// Add a new interface for the lean result
interface WatchlistLeanDocument {
  stocks: {
    symbol: string;
  }[];
}

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email || !email.includes('@')) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<UserDocument>({
      email: email.toLowerCase().trim(),
    });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find(
      { userId },
      { 'stocks.symbol': 1, _id: 0 }
    ).lean<WatchlistLeanDocument[]>();

    return items.flatMap((item: WatchlistLeanDocument) => 
      item.stocks.map((stock) => stock.symbol)
    );
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function getWatchlistStocks(email: string): Promise<WatchlistStock[]> {
  if (!email || !email.includes('@')) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<UserDocument>({
      email: email.toLowerCase().trim(),
    });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const watchlist = await Watchlist.findOne(
      { userId },
      { stocks: 1, _id: 0 }
    ).lean<WatchlistDocument>();

    return watchlist?.stocks || [];
  } catch (err) {
    console.error('getWatchlistStocks error:', err);
    return [];
  }
}

export async function removeFromWatchlist(symbol: string): Promise<boolean> {
  if (!symbol) return false;

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const result = await Watchlist.updateOne(
      {},
      { $pull: { stocks: { symbol } } }
    );

    return result.modifiedCount > 0;
  } catch (err) {
    console.error('removeFromWatchlist error:', err);
    return false;
  }
}