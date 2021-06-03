import React from 'react';
import WatchList from '../watchlist/Watchlist';
import PortfolioDashboard from '../portfolio/PortfolioDashboard';

const Home = () => {
  return (
    <div>
      <div className='container'>
        <div className='card border-0'>
          <div className='card-body '>
            <h2 className='card-title'>Welcome back, Chengjie Huang!</h2>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-7'>
              <PortfolioDashboard />
            </div>
            <div className='col-lg-5'>
              <WatchList />
            </div>
          </div>
        </div>
      </div>

      {/* <footer id='main-footer' className='bg-light footer'>
        <div class='container'>
          <div class='row'>
            <div class='col text-center py-4'>
              <h3>Stock Tracker</h3>
              <p>
                Copyright &copy; <span id='year'></span>
              </p>
              <a href='https://iexcloud.io'>Data provided by IEX Cloud</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
