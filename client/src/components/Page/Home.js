import React, { useContext, useEffect } from 'react';
import WatchList from '../watchlist/Watchlist';
import PortfolioDashboard from '../portfolio/PortfolioDashboard';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='container'>
        <div className='card border-0'>
          <div className='card-body '>
            <h2 className='card-title'>
              Welcome back, {authContext.user && authContext.user.name}!
            </h2>
          </div>
        </div>
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
  );
};

export default Home;
