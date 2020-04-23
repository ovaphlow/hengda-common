import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import md5 from 'blueimp-md5'

export default function DeptRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/当前用户"><CurrentUser /></Route>
        <Route path="/当前用户/修改密码"><ChangePassword /></Route>
      </Switch>
    </Router>
  )
}

function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#当前用户/修改密码" className="btn btn-sm btn-outline-info">
          修改密码
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href="#当前用户" className="btn btn-sm btn-outline-secondary">
          当前用户
        </a>
      </div>
    </>
  )
}

function CurrentUser() {
  const [id, setID] = useState(0)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [dept, setDept] = useState('')
  const [dept2, setDept2] = useState('')
  const [auth_super, setAuthSuper] = useState(0)
  const [remark, setRemark] = useState('')

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!auth) return
    ;(async id => {
      const response = await window.fetch(`/api/common/user/${id}`)
      const res = await response.json()
      setID(res.content.id)
      setName(res.content.name)
      setUsername(res.content.username)
      setPhone(res.content.phone)
      setDept(res.content.dept)
      setDept2(res.content.dept2)
      setAuthSuper(res.content.auth_super)
      setRemark(res.content.remark)
    })(auth.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleUpdate = async () => {
    const response = await window.fetch(`/api/common/user/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: name,
        username: username,
        phone: phone,
        remark: remark
      })
    })
    const res = response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#登录'
  }

  return (
    <>
      <h2>当前用户</h2>
      <hr />
      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-header">
          <span className="lead text-danger">
            修改用户信息后需要重新登录
          </span>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label>姓名</label>
                <input type="text" value={name || ''} autoComplete="name"
                  className="form-control"
                  onChange={event => setName(event.target.value)}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>用户名</label>
                <input type="text" value={username || ''} autoComplete="username"
                  className="form-control"
                  onChange={event => setUsername(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>电话</label>
                <input type="tel" value={phone || ''}
                  className="form-control"
                  onChange={event => setPhone(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>车间</label>
                <input type="text" value={dept || ''} readOnly
                  className="form-control"
                  onChange={event => setDept(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>班组</label>
                <input type="text" value={dept2 || ''} readOnly
                  className="form-control"
                  onChange={event => setDept2(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>权限：管理员</label>
                <input type="text" value={auth_super === 1 ? '是' : '否'} readOnly
                  className="form-control"
                  onChange={event => setAuthSuper(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>备注</label>
            <input type="text" value={remark || ''}
              className="form-control"
              onChange={event => setRemark(event.target.value)}
            />
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              <i className="fa fa-fw fa-check"></i>
              保存
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function ChangePassword() {
  const [current_password, setCurrentPassword] = useState('')
  const [new_password, setNewPassword] = useState('')
  const [new_password2, setNewPassword2] = useState('')

  const handleSubmit = async () => {
    const auth = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!auth) return
    if (!!!current_password || !!!new_password || !!!new_password2) {
      window.alert('请完整填写所需信息')
      return
    }
    if (new_password !== new_password2) {
      window.alert('两次输入的新密码不一致')
      return
    }
    const response = await window.fetch(`/api/common/user/password`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: auth.id,
        password: md5(current_password),
        password1: md5(new_password)
      })
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.location = '#登录'
  }

  return (
    <>
      <h2>修改密码</h2>
      <hr />
      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-header">
          <span className="lead text-danger">
            修改密码后需要重新登录
          </span>
        </div>

        <div className="card-body">
          <form>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>原密码</label>
                  <input type="password" value={current_password || ''} autoComplete="current-password"
                    className="form-control"
                    onChange={event => setCurrentPassword(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>新密码</label>
                  <input type="password" value={new_password || ''} autoComplete="new-password"
                    className="form-control"
                    onChange={event => setNewPassword(event.target.value)}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <label>重复新密码</label>
                  <input type="password" value={new_password2 || ''} autoComplete="new-password"
                    className="form-control"
                    onChange={event => setNewPassword2(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="card-footer">
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
