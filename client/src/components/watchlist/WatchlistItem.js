import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StockContext from '../../context/stock/stockContext';

const WatchlistItem = ({ watchlistItem }) => {
  const stock = watchlistItem;

  const stockContext = useContext(StockContext);
  const { searchSymbol, getStockData } = stockContext;

  const onClick = (e) => {
    searchSymbol(e.target.attributes.getNamedItem('symbol').value);
    getStockData(e.target.attributes.getNamedItem('symbol').value, '1d');
  };

  return (
    <div className='card mx-4 my-3 border-0'>
      <div className='row'>
        <div className='col-6' style={{ borderRight: '1px solid #D3D3D3' }}>
          <div className='card-body'>
            <h3>
              <Link to='stock' symbol={stock.symbol} onClick={onClick}>
                {stock.symbol}
              </Link>
            </h3>
            <div
              className='card-text ml-auto'
              style={{
                lineHeight: '1.5em',
                height: '1.5em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <div>{stock.companyName}</div>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='card-body'>
            <h4 className='ml-auto'>$ {stock.latestPrice}</h4>
            {stock.change < 0 ? (
              <div className='card-text ml-auto'>
                <div className='text-muted'>
                  {stock.change} (
                  {((stock.change / stock.previousClose) * 100).toFixed(2)}) %
                </div>
              </div>
            ) : (
              <div className='card-text ml-auto'>
                <div className='text-muted'>
                  {' '}
                  +{stock.change} (
                  {((stock.change / stock.previousClose) * 100).toFixed(2)}
                  %)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistItem;
