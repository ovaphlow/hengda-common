import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import md5 from 'blueimp-md5';

import IconLogIn from '../icon/LogIn';
import { Navbar, Sidebar } from '../Component';

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('app'),
);

function Index() {
  return (
    <HashRouter>
      <div className="container-fluid h-100">
        <Navbar />

        <div className="row h-100">
          <Sidebar />

          <div className="col-md-9 col-lg-10 ml-sm-auto h-100">
            <Switch>
              <Route exact path="/"><SignIn /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!username || !password) {
      window.alert('请完整输入所需信息');
      return;
    }
    const u = {
      username,
      password: md5(password),
    };
    window.fetch('/api/setting/user/sign-in/super', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(u),
    }).then((response) => response.json()).then((data) => {
      if (data.message) {
        window.alert(data.message);
        return;
      }
      sessionStorage.setItem('auth_super', JSON.stringify(data.content));
      window.location = 'home.html';
    });
  };

  return (
    <div className="h-100">
      <h2>登录</h2>
      <hr />

      <div className="row">
        <div className="col-6 offset-3 col-lg-4 offset-lg-4">
          <div className="card shadow mt-5">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="mb-3">用户名</label>
                  <input
                    type="text"
                    value={username}
                    autoComplete="username"
                    className="form-control"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="mb-3">密码</label>
                  <input
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    className="form-control"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="card-footer">
              <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
                <IconLogIn />
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
