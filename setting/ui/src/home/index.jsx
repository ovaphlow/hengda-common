import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { SIGN_IN_URL } from '../constant';
import { Navbar, Sidebar } from '../Component';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth_super'));
    if (!auth) window.location = SIGN_IN_URL;
  }, []);

  return (
    <HashRouter>
      <div className="container-fluid">
        <Navbar />

        <div className="row">
          <Sidebar />

          <div className="col-md-9 col-lg-10 ml-sm-auto">
            <Switch>
              <Route exact path="/"><Home /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default function Home() {
  return (
    <>
      <h1>首页</h1>
      <hr />

      <p className="lead text-muted">
        数据变更记录？
      </p>
    </>
  );
}
