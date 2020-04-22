import React from 'react'
import md5 from 'blueimp-md5'

function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#修改密码" className="btn btn-sm btn-outline-info">
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

export function CurrentUser() {
  const [item, setItem] = React.useState(0)

  React.useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!auth) return
    const fetchData = async id => {
      const response = await window.fetch(`/api/common/user/${id}`)
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      setItem(res.content)
    }
    fetchData(auth.id)
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    const response = await window.fetch(`/api/common/user/${item.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
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
                <input type="text" name="name" value={item.name || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label>用户名</label>
                <input type="text" name="username" value={item.username || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>电话</label>
                <input type="text" name="phone" value={item.phone || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>部门</label>
                <input type="text" name="dept" value={item.dept || ''} readOnly
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>权限：管理员</label>
                <input type="text" name="auth_super" value={item.auth_super === 1 ? '是' : '否'} readOnly
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>备注</label>
            <input type="text" name="remark" value={item.remark || ''}
                className="form-control"
                onChange={handleChange}
            />
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export function ChangePassword() {
  const [item, setItem] = React.useState({
    password: '',
    password1: '',
    password2: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const auth = JSON.parse(sessionStorage.getItem('auth_super'))
    if (!!!auth) return
    if (!!!item.password || !!!item.password1 || !!!item.password2) {
      window.alert('请完整填写所需信息')
      return
    }
    if (item.password1 !== item.password2) {
      window.alert('两次输入的新密码不一致')
      return
    }
    const response = await window.fetch(`/api/common/user/password`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: auth.id,
        password: md5(item.password),
        password1: md5(item.password1)
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
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>原密码</label>
                <input type="password" name="password" value={item.password || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>新密码</label>
                <input type="password" name="password1" value={item.password1 || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>重复新密码</label>
                <input type="password" name="password2" value={item.password2 || ''}
                    className="form-control"
                    onChange={handleChange}
                />
              </div>
            </div>
          </div>
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
