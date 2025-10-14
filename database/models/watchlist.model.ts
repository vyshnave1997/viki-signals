import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // Add index for faster queries
    },
    stocks: [
      {
        symbol: {
          type: String,
          required: true,
          uppercase: true, // Automatically convert to uppercase
          trim: true, // Remove whitespace
        },
        company: {
          type: String,
          required: true,
          trim: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add compound index for userId and symbol
watchlistSchema.index({ userId: 1, 'stocks.symbol': 1 });

// Ensure the model isn't already defined
export default mongoose.models.Watchlist || mongoose.model('Watchlist', watchlistSchema);