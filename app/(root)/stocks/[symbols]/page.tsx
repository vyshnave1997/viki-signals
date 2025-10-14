import TradingViewWidget from "@/components/TradingViewWidget";
// import WatchlistButton from "@/components/WatchListButton";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";

interface StockDetailsPageProps {
  params: {
    symbols: string; // Note: param name should match folder name [symbols]
  };
}

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const symbol = params.symbols;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  if (!symbol) {
    return <div>Invalid symbol</div>;
  }

  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 gap-8 w-full">
        {/* Full-width Symbol Info */}
        <TradingViewWidget
          scriptUrl={`${scriptUrl}symbol-info.js`}
          config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
          height={170}
        />

        {/* Full-width Candle Chart */}
        <TradingViewWidget
          scriptUrl={`${scriptUrl}advanced-chart.js`}
          config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
          className="custom-chart"
          height={800}
        />

        {/* Balance Chart */}
        <TradingViewWidget
          scriptUrl={`${scriptUrl}advanced-chart.js`}
          config={BASELINE_WIDGET_CONFIG(symbol)}
          className="custom-chart"
          height={600}
        />

        {/* Company Profile */}
        <TradingViewWidget
          scriptUrl={`${scriptUrl}company-profile.js`}
          config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
          height={400}
        />

        {/* Technical Analysis and Financials side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={464}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}financials.js`}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </div>

        {/* Watchlist Button at the bottom */}
        <div className="flex justify-end">
          {/* <WatchlistButton
            symbol={symbol.toUpperCase()}
            company={symbol.toUpperCase()}
            isInWatchlist={false}
          /> */}
        </div>
      </section>
    </div>
  );
}