import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import StockContext from '../../context/stock/stockContext';
import PortfolioContext from '../../context/portfolio/portfolioContext';

const PortfolioItem = ({ portfolioItem }) => {
  const stockContext = useContext(StockContext);
  const { searchSymbol, getStockData } = stockContext;
  const portfolioContext = useContext(PortfolioContext);
  const { worth } = portfolioContext;

  const onClick = (e) => {
    searchSymbol(e.target.attributes.getNamedItem('symbol').value);
    getStockData(e.target.attributes.getNamedItem('symbol').value, '1d');
  };
  return (
    <div className='card mx-4 my-3 border-0'>
      <div className='row'>
        <div className='col-4' style={{ borderRight: '1px solid #D3D3D3' }}>
          <div className='card-body'>
            <h3>
              <Link to='stock' symbol={portfolioItem.symbol} onClick={onClick}>
                {portfolioItem.symbol}
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
              <div>{portfolioItem.companyName}</div>
            </div>
          </div>
        </div>
        <div className='col-4' style={{ borderRight: '1px solid #D3D3D3' }}>
          <div className='card-body'>
            <h4 className='ml-auto'>$ {portfolioItem.latestPrice}</h4>
            {portfolioItem.change < 0 ? (
              <div className='card-text ml-auto'>
                <div className='text-muted'>
                  {portfolioItem.change} (
                  {(
                    (portfolioItem.change / portfolioItem.previousClose) *
                    100
                  ).toFixed(2)}
                  ) %
                </div>
              </div>
            ) : (
              <div className='card-text ml-auto'>
                <div className='text-muted'>
                  {' '}
                  +{portfolioItem.change} (
                  {(
                    (portfolioItem.change / portfolioItem.previousClose) *
                    100
                  ).toFixed(2)}
                  %)
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='col-4'>
          <div className='card-body'>
            <div className='card-text ml-auto'>
              x{portfolioItem.numShares} Shares =
            </div>
            <h4 className='ml-auto'>$ {portfolioItem.worth.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
