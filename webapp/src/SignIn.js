import React from 'react'
import md5 from 'blueimp-md5'

function SignIn() {
  const [item, setItem] = React.useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSignIn = async () => {
    const u = {
      username: item.username,
      password: md5(item.password)
    }
    const response = await fetch(`/api/common/user/sign-in/super`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(u)
    })
    const result = await response.json()
    if (result.message) {
      window.alert(result.message)
      return
    }
    sessionStorage.setItem('auth_super', JSON.stringify(result.content))
    window.location = '#/'
  }

  return (
    <>
      <h2>登录</h2>
      <hr />

      <div className="row">
        <div className="col-6 offset-3 col-lg-4 offset-lg-4">
          <div className="card shadow mt-5">
            <div className="card-body">
              <div className="form-group">
                <label>用户名</label>
                <input type="text" name="username" value={item.username || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>密码</label>
                <input type="password" name="password" value={item.password || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
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

export default SignIn
