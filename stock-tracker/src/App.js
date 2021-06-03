import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Home from './components/Page/Home'
import About from './components/Page/About'
import Stock from './components/Page/Stock'
import Navbar from './components/layout/Navbar'
import Alerts from './components/layout/Alerts'

import StockState from './context/stock/StockState'
import AlertState from './context/alert/AlertState'
import PortfolioState from './context/portfolio/PortfolioState'


function App() {
  return (
    <PortfolioState>
      <StockState>
        <AlertState>
          <Fragment>
            <Router>
              <Navbar />

              <Switch>
                <div className='container'>
                  <Alerts />
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/about' component={About}></Route>
                  <Route exact path='/stock' component={Stock}></Route>
                  <Route exact path='/Login'></Route>
                  <Route exact path='/Register'></Route>
                </div>
              </Switch>
            </Router>
          </Fragment>
        </AlertState>
      </StockState>
    </PortfolioState>
  );
}

export default App;
