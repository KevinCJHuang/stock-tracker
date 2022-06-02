import React, { useContext, useState, useEffect } from 'react';
import StockContext from '../../context/stock/stockContext';
import PortfolioContext from '../../context/portfolio/portfolioContext';
import AlertContext from '../../context/alert/alertContext';
import BuySellContext from '../../context/buySell/buySellContext';

const BuySell = (props) => {
  const stockContext = useContext(StockContext);
  const portfolioContext = useContext(PortfolioContext);
  const alertContext = useContext(AlertContext);
  const buySellContext = useContext(BuySellContext);

  const { stock } = stockContext;
  const { cashWorth, portfolioStocks, buyShares, sellShares } =
    portfolioContext;
  const { setAlert } = alertContext;
  const { activeTab, set_buySell } = buySellContext;

  const [offer, setOffer] = useState({
    amount: 0,
  });
  const { amount } = offer;

  const [sharesAvailable, setSharesAvailable] = useState(0);

  useEffect(() => {
    const targetStock = portfolioStocks.find((s) => s.symbol === stock.symbol);
    if (targetStock) {
      setSharesAvailable(targetStock.numShares);
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setOffer({ amount: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'buy') {
      if ((stock.latestPrice * amount).toFixed(2) > cashWorth) {
        return setAlert('Purchase failed: not enough cash.', 'danger');
      }
      await buyShares(
        {
          symbol: stock.symbol,
          numShares: amount,
          type: 'stock',
        },
        {
          symbol: 'Cash',
          numShares: -stock.latestPrice * amount,
          type: 'cash',
        }
      );
    } else {
      if (sharesAvailable < amount) {
        return setAlert('Sell failed: not enough shares available.', 'danger');
      }
      await sellShares(
        {
          symbol: stock.symbol,
          numShares: -amount,
          type: 'stock',
        },
        {
          symbol: 'Cash',
          numShares: stock.latestPrice * amount,
          type: 'cash',
        }
      );
    }
    props.history.push('/');
  };

  const buyTab = (e) => {
    set_buySell('buy');
  };

  const sellTab = (e) => {
    set_buySell('sell');
  };

  const cancel = (e) => {
    props.history.push('/stock');
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 offset-3'>
          <div className='card'>
            <div className='card-header'>
              <ul className='nav nav-tabs card-header-tabs'>
                <li className='nav-item'>
                  <a
                    className={
                      activeTab === 'buy' ? 'nav-link active' : 'nav-link'
                    }
                    onClick={buyTab}
                    href='/#'
                  >
                    Buy
                  </a>
                </li>
                <li className='nav-item'>
                  <a
                    className={
                      activeTab === 'sell' ? 'nav-link active' : 'nav-link'
                    }
                    onClick={sellTab}
                    href='/#'
                  >
                    Sell
                  </a>
                </li>
              </ul>
            </div>
            {activeTab === 'buy' ? (
              <div>
                <div className='card-body'>
                  <h3 className='text-center'>{stock.symbol} - Buy</h3>
                  <form onSubmit={onSubmit}>
                    <div className='form-group'>
                      <label htmlFor='amount'>Buy Amount</label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          className='form-control'
                          type='number'
                          name='amount'
                          value={amount}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='amount'>Price Per Share</label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          readOnly='readOnly'
                          className='form-control'
                          type='number'
                          value={stock.latestPrice.toFixed(2)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='totalCost'>Total Cost </label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          readOnly='readOnly'
                          className='form-control'
                          type='number'
                          value={(stock.latestPrice * amount).toFixed(2)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='availableCash'>Available Cash</label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          readOnly='readOnly'
                          className='form-control'
                          type='number'
                          value={cashWorth.toFixed(2)}
                        />
                      </div>
                    </div>
                    <input
                      type='submit'
                      value='Confirm Purchase'
                      className='btn btn-primary btn-block mb-2'
                    />
                    <input
                      type='submit'
                      value='Cancel'
                      className='btn btn-danger btn-block'
                      onClick={cancel}
                    />
                  </form>
                </div>
              </div>
            ) : sharesAvailable ? (
              <div>
                <div className='card-body'>
                  <h3 className='text-center'>{stock.symbol} - Sell</h3>
                  <form onSubmit={onSubmit}>
                    <div className='form-group'>
                      <label htmlFor='sharesAvailable'>Shares Available</label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          readOnly='readOnly'
                          className='form-control'
                          type='number'
                          value={sharesAvailable}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='amount'>Sell Amount</label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          className='form-control'
                          type='number'
                          name='amount'
                          value={amount}
                          onChange={onChange}
                          required
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='amount'>Price Per Share</label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          readOnly='readOnly'
                          className='form-control'
                          type='number'
                          value={stock.latestPrice.toFixed(2)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='totalCost'>Total Cash Gain </label>
                      <div className='input-group'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'>$</span>
                        </div>
                        <input
                          readOnly='readOnly'
                          className='form-control'
                          type='number'
                          value={(stock.latestPrice * amount).toFixed(2)}
                        />
                      </div>
                    </div>
                    <input
                      type='submit'
                      value='Confirm Sell'
                      className='btn btn-primary btn-block'
                    />
                    <input
                      type='button'
                      value='Cancel'
                      className='btn btn-danger btn-block'
                      onClick={cancel}
                    />
                  </form>
                </div>
              </div>
            ) : (
              <div className='card-body'>
                <h3 className='text-center'>
                  Unavailable - You do not hold any {stock.symbol} shares.
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySell;
