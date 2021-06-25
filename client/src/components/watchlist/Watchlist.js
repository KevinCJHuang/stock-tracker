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
    { stocks.length === 0 ? (
      <div className='card m-3'>
        <div className='card-body text-center'>
          <div className='display-3 mb-3'>Watchlist</div>
          <h5>
            Your Watchlist is empty.
            Search for a stock and add it to your Watchlist!
          </h5>
        </div>
      </div>

    )
      : (
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
        )
    }   
    </Fragment> 
  );
};

export default Watchlist;
