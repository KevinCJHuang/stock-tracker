import React, { useContext, Fragment, useEffect } from 'react';
import WatchlistItem from './WatchlistItem';
import StockContext from '../../context/stock/stockContext';

const Watchlist = () => {
  const stockContext = useContext(StockContext);
  const { stocks, getStocks } = stockContext;

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div className='card m-3'>
        <div className='card-body text-center'>
          <div className='display-3'>Watchlist</div>
        </div>
      {stocks.map((watchlistItem) => (
        <WatchlistItem
          watchlistItem={watchlistItem}
          key={watchlistItem.symbol}
        ></WatchlistItem>
      ))}
      </div>

    </Fragment>
  );
};

export default Watchlist;
