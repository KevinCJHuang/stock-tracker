import React, { useContext, Fragment, useEffect } from 'react';
import WatchlistItem from './WatchlistItem';
import StockContext from '../../context/stock/stockContext';

const Watchlist = () => {
  const stockContext = useContext(StockContext);
  const { stocks, getStocks } = stockContext;

  useEffect(() => {
    getStocks();
  }, []);
  return (
    <Fragment>
      <div className='card m-2 border-0'>
        <div className='card-body'>
          <div className='display-3'>Watchlist</div>
        </div>
      </div>
      {stocks.map((watchlistItem) => (
        <WatchlistItem
          watchlistItem={watchlistItem}
          key={watchlistItem.symbol}
        ></WatchlistItem>
      ))}
    </Fragment>
  );
};

export default Watchlist;
