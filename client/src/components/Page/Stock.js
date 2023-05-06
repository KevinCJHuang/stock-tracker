import React, { useContext } from 'react';
import StockContext from '../../context/stock/stockContext';
import AlertContext from '../../context/alert/alertContext';
import BuySellContext from '../../context/buySell/buySellContext';

import Spinner from '../layout/Spinner';
import { Line } from 'react-chartjs-2';

const Stock = (props) => {
  // Stock context
  const stockContext = useContext(StockContext);
  const alertContext = useContext(AlertContext);
  const buySellContext = useContext(BuySellContext);

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
  const { set_buySell } = buySellContext;

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

  const buy = (e) => {
    set_buySell('buy');
    props.history.push('/buySell');
  };
  const sell = (e) => {
    set_buySell('sell');
    props.history.push('/buySell');
  };

  if (loading) {
    return <Spinner />;
  } else if (stock === null) {
    return (
      <div className='container'>
        <div className='card border-0'>
          <div className='card-body'>
            <h3 className='mb-3'>
              Sorry, the stock you searched for cannot be found.
            </h3>
            <h3 className='mb-3'>
              Please enter the correct{' '}
              <b>
                <u>Symbol</u>
              </b>{' '}
              of the stock.
            </h3>
            <h4>E.g. AAPL, TSLA, BILI</h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container'>
        <div className='card mb-4'>
          <div className='card-body'>
            <div className='row mx-2'>
              <div className='col-9 border-0 p-2'>
                <h2 className='card-title' style={{ color: 'red' }}>
                  {stock.companyName}
                </h2>
                <h4 className='card-subtitle text-muted'>({stock.symbol})</h4>
              </div>
              <div className='col-3'>
                {inWatchlist ? (
                  <button
                    className='btn btn-dark btn-block mb-3'
                    onClick={removeFromWatchlistClick}
                  >
                    <i className='fa fa-minus mr-2'></i>
                    Remove from Watchlist
                  </button>
                ) : (
                  <button
                    className='btn btn-light btn-block mb-3'
                    onClick={addToWatchlistClick}
                  >
                    <i className='fa fa-plus mr-2'></i>
                    Add to Watchlist
                  </button>
                )}
                <div className='row'>
                  <div className='col-6'>
                    <button
                      className='btn btn-outline-success btn-block'
                      onClick={buy}
                    >
                      Buy
                    </button>
                  </div>
                  <div className='col-6'>
                    <button
                      className='btn btn-outline-danger btn-block'
                      onClick={sell}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
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
