import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Page/Home';
import About from './components/Page/About';
import Stock from './components/Page/Stock';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import StockState from './context/stock/StockState';
import AlertState from './context/alert/AlertState';
import PortfolioState from './context/portfolio/PortfolioState';
import setAuthToken from './utils/setAuthToken';
import AuthState from './context/auth/AuthState';

if (localStorage) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <PortfolioState>
        <StockState>
          <AlertState>
            <Fragment>
              <Router>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute
                      exact
                      path='/'
                      component={Home}
                    ></PrivateRoute>
                    <Route exact path='/about' component={About}></Route>
                    <PrivateRoute
                      exact
                      path='/stock'
                      component={Stock}
                    ></PrivateRoute>
                    <Route exact path='/Login' component={Login}></Route>
                    <Route exact path='/Register' component={Register}></Route>
                  </Switch>
                </div>
              </Router>
            </Fragment>
          </AlertState>
        </StockState>
      </PortfolioState>
    </AuthState>
  );
}

export default App;
