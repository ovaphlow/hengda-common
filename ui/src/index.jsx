import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';
import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="workspace">
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </HashRouter>
      </main>

      <footer>1123</footer>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
