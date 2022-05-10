# What is stock-tracker?

Published link: http://chuang-stock-tracker.herokuapp.com/ (As of May 1, 2022, this webpage has been brought offline.)

Feedback Contact: kevin.cj.huang@gmail.com

This stock-tracker web app is inspired by [Rotman Portfolio Manager (RPM)](http://rpm.rotman.utoronto.ca/webtrader/login.aspx). It allows a user to simulate online stock trading over a time period. Once a user creates an account, $2,000 simulated currency would be granted to the user's account. The user could then search for stocks, add them to a watchlist, or buy/sell shares.

In the long term, the following features could be added to the app:
- Connecting to an API of chosen brokers to trade stock shares with real time price.
- Allow users to set up trading patterns. E.g., Purchase `n` shares every Monday.
- Provide more analytical ratios and tools to generate investment suggestions.
- Introduce a user trading ranking system.


# Steps to use:
1. Go to http://chuang-stock-tracker.herokuapp.com/
2. Login or Register with your email. Please choose a password that's at least 6 characters long. For test purposes, feel free to use simple passwords like 123456.
3. Upon first login, the user will be granted with a $2,000 initial cash and no stocks. Please use the Search box on the nav bar to search and buy a stock. When searching, please use the symbol name of a stock. For example, AAPL for Apple, or TSLA for Tesla.
4. Upon a successful search of a stock symbol, the user could view the current and past price of a stock. The user could also add the stock to his/her watchlist, or buy/sell shares using the corresponding buttoms on the top right of the page.
5. Lastly, the Portfolio Composition chart on the Home page illustrates the composition of a user's portfolio.

# Technical Details

The technical details of the web app will be explained in two logic layers: frontend and backend

## Frontend
The code for the frontend is located in stock-tracker/client. It is built with a React framework for components along with Bootstrap for CSS.

- `stock-tracker/client/src` contains all the important frontend directories files, as follows:
- `stock-tracker/client/src/components` - contains all the components, which are grouped by their purposes or categories.
- `stock-tracker/client/src/context` - contains all the React hooks and Context APIs. This will be discussed in detail later.
- `stock-tracker/client/src/utils` - contains a simple helper file that automatically puts token into the header of an API POST request.

In some cases, the client shares data through Context. In contrast to directly using props, which requires passing props up and down along the component tree, Context, like Redux, is a relatively new feature that groups shared data in a centralized way, and notifies all the observer components that subscribes a piece of data through Context.

In addition to data pieces, the Contexts also contains functions to be called to handle API calls to the backend. Generally, after a React component receives a user intention, it would call function provided by the centralized Context, which then handles the API call and updates data pieces according to its response. Once the corresponding data piece changes, the component would be notified by the Context to update the view.

Lastly, `stock-tracker/client/src/App.js` contains a React arrow function does the following:
- Handles routing. This includes a normal Route that leads to a public path (e.g., `/Login` or `/Register`), and a private Route that can only be accessed after logged in (e.g., `/buysell` or `/stock`).
- Wraps Context state classes around all components, so that each component could access Contexts as needed).

## Backend
The database that's used to store user credentials and user stocks is a cloud-hosted MongoDB on AWS. Lastly, the entire website is deployed as a Heroku app on https://www.heroku.com/.

The backend is run by `Express` and `Node.js`, which means all the API calls are processed by Express. There are four API files in stock-tracker/routes/ as following:
- `stock-tracker/routes/auth.js` - handles user registration
- `stock-tracker/routes/portfolio.js` - handles stock buys and sells
- `stock-tracker/routes/users.js` - handles user login and log out
- `stock-tracker/routes/watchlist.js` - handles adding or removing of a stock to a user's watchlist

The stock-tracker/models/ directory contains model schemes for MongoDB. For example, stock-tracker/models/Users.js specifies that a User model on the MongoDB need a name, email, password, and a registration date.

Lastly, The stock-tracker/middleware/ directory contains a helper arrow function that checks the authentication status of a user.
