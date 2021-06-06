import React, { useContext } from 'react';
import StockContext from '../../context/stock/stockContext';
import AlertContext from '../../context/alert/alertContext';

import Spinner from '../layout/Spinner';
import { Line } from 'react-chartjs-2';

const Stock = (props) => {
  // Stock context
  const stockContext = useContext(StockContext);
  const alertContext = useContext(AlertContext);

  const {
    loading,
    stock,
    inWatchlist,
    stockGraphData,
    stockGraphOptions,
    getStockData,
    addToWatchlist,
    removeFromWatchList,
  } = stockContext;
  const { setAlert } = alertContext;

  const setTimeRange = (e) => {
    getStockData(
      stock.symbol,
      e.target.attributes.getNamedItem('data-key').value
    );
  };

  const addToWatchlistClick = async (e) => {
    e.preventDefault();
    await addToWatchlist();
    setAlert(stock.symbol + ' added to watchlist', 'success');
  };

  const removeFromWatchlistClick = (e) => {
    e.preventDefault();
    removeFromWatchList();
    setAlert(stock.symbol + ' removed from watchlist', 'success');
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='container'>
        <div className='card mb-4'>
          <div className='card-body'>
            <div className='row mx-2'>
              <div className='col-9 border-0 p-2'>
                <h2 className='card-title '>{stock.companyName} </h2>
                <h4 className='card-subtitle text-muted'>({stock.symbol})</h4>
              </div>
              {inWatchlist ? (
                <div className='col-3'>
                  <button
                    className='btn btn-dark'
                    onClick={removeFromWatchlistClick}
                  >
                    <i className='fa fa-minus mr-2'></i>
                    Remove from Watchlist
                  </button>
                </div>
              ) : (
                <div className='col-3'>
                  <button
                    className='btn btn-light'
                    onClick={addToWatchlistClick}
                  >
                    <i className='fa fa-plus mr-2'></i>
                    Add to Watchlist
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <h1 className='d-inline-block'>$ {stock.latestPrice}</h1>
            {stock.change < 0 ? (
              <p className='display-5  d-inline-block'>
                +{stock.change} (
                {((stock.change / stock.previousClose) * 100).toFixed(2)}) %
              </p>
            ) : (
              <div>
                <h4 className='display-5 d-inline-block'>
                  +{stock.change} (
                  {((stock.change / stock.previousClose) * 100).toFixed(2)}
                  %)
                </h4>
              </div>
            )}
          </div>
        </div>
        <Line
          className='mb-3'
          data={stockGraphData}
          options={stockGraphOptions}
        />
        <div className='btn-group' onClick={setTimeRange}>
          <button className='btn btn-secondary' type='button' data-key='1d'>
            1 Day
          </button>
          <button className='btn btn-secondary' type='button' data-key='1m'>
            1 Month
          </button>
          {/* <button className='btn btn-secondary' type='button' data-key='3m'>
            3 Months
          </button>
          <button className='btn btn-secondary' type='button' data-key='6m'>
            6 Months
          </button> */}
          {/* <button className='btn btn-secondary' type='button' data-key='1y'>
            1 Year
          </button>
          <button className='btn btn-secondary' type='button' data-key='5y'>
            5 Years
          </button> */}
        </div>
      </div>
    );
  }
};

export default Stock;
