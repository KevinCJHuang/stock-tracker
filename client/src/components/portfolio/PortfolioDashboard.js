import React, { Fragment, useEffect, useContext } from 'react';
import PortfolioContext from '../../context/portfolio/portfolioContext';
import { Pie } from 'react-chartjs-2';
import PortfolioItem from './portfolioItem'

const PortfolioDashboard = () => {
  const portfolioContext = useContext(PortfolioContext);
  const {
    cashWorth,
    stockWorth,
    worth,
    PieDatasets,
    getPortfolio,
    portfolioStocks,
  } = portfolioContext;

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <Fragment>
      <div className='card m-3'>
        <div className='card-body'>
          <div className='display-3 mb-4 text-center'>Portfolio</div>
          <h3 className='mb-2 text-center'>Cash: ${cashWorth.toFixed(2)} | Stock: ${stockWorth.toFixed(2)}</h3>
          <div className='text-muted text-center'>Total: ${worth.toFixed(2)} </div>
        </div>
        {portfolioStocks.map((portfolioItem) => (
        <PortfolioItem
          portfolioItem={portfolioItem}
          key={portfolioItem.symbol}
        ></PortfolioItem>
      ))}
      </div>      
      <div className='card m-3'>
        <div className="card-header">
          Portfolio Composition
        </div>
        <div className="card-body text-center">
        <Pie
          data={PieDatasets}
          options={{
            title:{
              display:true,
              text:'Portfolio Composition',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
          style={{width:'400px', margin:"auto",display: 'block'}}
          className="mt-3"
        />
      </div>
      </div>
    </Fragment>
  );
};

export default PortfolioDashboard;
