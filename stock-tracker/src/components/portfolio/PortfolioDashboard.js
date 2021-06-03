import React, { Fragment, useEffect, useContext } from 'react';
import PortfolioContext from '../../context/portfolio/portfolioContext';
import { Line } from 'react-chartjs-2';

const PortfolioDashboard = () => {
  const portfolioContext = useContext(PortfolioContext);
  const { portfolioStocks, worth, portfolioGraphData, portfolioGraphOptions } =
    portfolioContext;

  useEffect(() => {
    console.log(123);
  }, []);

  return (
  <Fragment>
      <div className='card m-2 border-0'>
        <div className='card-body'>
          <div className='display-3 mb-2'>Portfolio</div>
          <h3 className='mb-2'>Total Worth: ${worth}</h3>
        </div>
        <Line
          className='mb-3'
          data={portfolioGraphData}
          options={portfolioGraphOptions}
        />
      </div>
    </Fragment>
  );
};

export default PortfolioDashboard;
