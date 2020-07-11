import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import { Navbar, Sidebar } from '../Component';
import { SIGN_IN_URL } from '../constant';
import List from './List';
import Detail from './Detail';
import TeamDetail from './TeamDetail';

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
      <div className="container-fluid h-100">
        <Navbar />

        <div className="row h-100">
          <Sidebar />

          <div className="col-md-9 col-lg-10 ml-sm-auto h-100">
            <Switch>
              <Route exact path="/"><List /></Route>
              <Route exact path="/新增"><Detail component_option="新增" /></Route>
              <Route exact path="/班组/新增"><TeamDetail component_option="新增" /></Route>
              <Route exact path="/班组/:id"><TeamDetail component_option="编辑" /></Route>
              <Route exact path="/:id"><Detail component_option="编辑" /></Route>
              <Route exact path="/:id/新增"><Detail component_option="新增班组" /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
