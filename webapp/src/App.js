import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Navbar, Sidebar } from './Components'
import Home from './Home'
import SignIn from './SignIn'
import { CurrentUser, ChangePassword } from './CurrentUser'
import DeptRouter from './Dept'
import Dept2Router from './Dept2'
import UserRouter from './User'
import ModelRouter from './Model'
import { List as TrainList, Save as TrainSave, Update as TrainUpdate } from './Train'
import RouteRouter from './Route'

function App() {
  React.useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!auth) {
      window.location = '#登录'
      return
    }
  }, [])

  return (
    <Router>
      <div className="container-fluid">
        <Navbar />

        <div className="row">
          <Sidebar />

          <div className="col-md-9 col-lg-10 ml-sm-auto">
            <Switch>
              <Route exact path="/"><Home /></Route>

              <Route path="/登录"><SignIn /></Route>
              <Route path="/当前用户"><CurrentUser /></Route>
              <Route path="/修改密码"><ChangePassword /></Route>

              <Route path="/部门结构"><DeptRouter /></Route>
              <Route path="/班组"><Dept2Router /></Route>

              <Route path="/用户"><UserRouter /></Route>

              <Route path="/车型"><ModelRouter /></Route>

              <Route exact path="/车组"><TrainList /></Route>
              <Route path="/车组/新增"><TrainSave /></Route>
              <Route path="/车组/:id"><TrainUpdate /></Route>

              <Route path="/车次"><RouteRouter /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
