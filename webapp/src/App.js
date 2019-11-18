import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Navbar, Sidebar } from './Components'
import Home from './Home'
import { List as DeptList, Save as DeptSave, Update as DeptUpdate } from './Dept'
import { List as UserList, Save as UserSave, Update as UserUpdate } from './User'
import { List as ModelList, Save as ModelSave, Update as ModelUpdate } from './Model'

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />

        <div className="row">
          <Sidebar />

          <div className="col-md-9 col-lg-10 ml-sm-auto">
            <Switch>
              <Route exact path="/"><Home /></Route>

              <Route exact path="/部门结构"><DeptList /></Route>
              <Route path="/部门结构/新增"><DeptSave /></Route>
              <Route exact path="/部门结构/:id"><DeptUpdate /></Route>
              <Route path="/部门结构/:id/新增"><DeptSave /></Route>

              <Route exact path="/用户"><UserList /></Route>
              <Route path="/用户/新增"><UserSave /></Route>
              <Route path="/用户/:id"><UserUpdate /></Route>

              <Route exact path="/车型"><ModelList /></Route>
              <Route path="/车型/新增"><ModelSave /></Route>
              <Route path="/车型/:id"><ModelUpdate /></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
