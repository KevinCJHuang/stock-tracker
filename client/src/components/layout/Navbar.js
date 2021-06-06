import React, { useState, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import StockContext from '../../context/stock/stockContext';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
  const [symbol, setSymbol] = useState('');
  const stockContext = useContext(StockContext);
  const { searchSymbol, getStockData } = stockContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const onChange = (e) => {
    setSymbol(e.target.value);
  };

  const onSubmit = (e) => {
    searchSymbol(symbol);
    getStockData(symbol, '1d');
  };

  const logoutOnClick = (e) => {
    logout();
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-3'>
      <div className='container'>
        <Link className='nav-link' to='/'>
          <div className='navbar-brand'>
            <i className='fas fa-lg fa-chart-line align-middle mr-3'></i>
            <h3 className='align-middle d-inline'>Stock Tracker</h3>{' '}
          </div>
        </Link>

        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarToggler'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarToggler'>
          {isAuthenticated ? (
            <Fragment>
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/about'>
                    About
                  </Link>
                </li>
              </ul>
                        <form
                            className='form-inline mx-auto'
                            onSubmit={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <input
                              className='form-control mr-2'
                              type='search'
                              value={symbol}
                              name='symbol'
                              placeholder='Search for a symbol...'
                              onChange={onChange}
                            />

                                    <Link
                                      to='/stock'
                                      className='btn btn-outline-dark'
                                      type='submit'
                                      onClick={onSubmit}
                                    >
                                      Search
                                    </Link>
                                  </form>
                        <ul className='navbar-nav'>
                          <li className='nav-item'>
                            <a href='#!' onClick={logoutOnClick}>
                              <span className='hide-sm nav-link'>Logout</span>
                            </a>
                          </li>
                        </ul>
            </Fragment>
          ) : (
            <ul className='navbar-nav ml-auto'>
              
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
