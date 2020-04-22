import React, { useState } from 'react'
import md5 from 'blueimp-md5'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    if (!!!username || !!!password) {
      window.alert('请完整输入所需信息')
      return
    }
    const u = {
      username: username,
      password: md5(password)
    }
    const response = await window.fetch(`/api/common/user/sign-in/super`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(u)
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    sessionStorage.setItem('auth_super', JSON.stringify(res.content))
    window.history.go(-1)
  }

  return (
    <>
      <h2>登录</h2>
      <hr />

      <div className="row">
        <div className="col-6 offset-3 col-lg-4 offset-lg-4">
          <div className="card shadow mt-5">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>用户名</label>
                  <input type="text" value={username || ''} autoComplete="username"
                    className="form-control"
                    onChange={event => setUsername(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>密码</label>
                  <input type="password" value={password || ''} autoComplete="current-password"
                    className="form-control"
                    onChange={event => setPassword(event.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="card-footer">
              <button type="button" className="btn btn-block btn-primary" onClick={handleSignIn}>
                <i className="fa fa-fw fa-sign-in"></i>
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
