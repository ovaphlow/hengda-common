import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'
import md5 from 'blueimp-md5'

import { DeptPicker, Dept2Picker } from './Components'

export default function UserRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/用户"><List /></Route>
        <Route exact path="/用户/新增"><Detail category="新增" /></Route>
        <Route path="/用户/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#用户/新增" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href="#用户" className="btn btn-sm btn-outline-secondary">
          <i className="fa fa-fw fa-list"></i>
          列表
        </a>
      </div>
    </>
  )
}

function List() {
  const [user_list, setUserList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/common/user/`)
      const result = await response.json()
      setUserList(result.content)
    })()
  }, [])

  return (
    <>
      <h2>用户</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="text-right">序号</th>
                <th>姓名</th>
                <th>用户名</th>
                <th>电话号码</th>
                <th>车间</th>
                <th>班组</th>
                <th>管理员</th>
              </tr>
            </thead>

            <tbody>
              {
                user_list.map(it => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#用户/${it.id}`}>
                        <i className="fa fa-fw fa-edit"></i>
                      </a>
                      <span className="pull-right">
                        {it.id}
                      </span>
                    </td>
                    <td>{it.name}</td>
                    <td>{it.username}</td>
                    <td>{it.phone}</td>
                    <td>{it.dept}</td>
                    <td>{it.dept2}</td>
                    <td>{it.super === 1 ? '是' : '否'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Detail(props) {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [dept_id, setDeptID] = useState(0)
  const [master_id, setMasterID] = useState(0)
  const [remark, setRemark] = useState('')
  const [dept2_list, setDept2List] = useState([])

  useEffect(() => {
    if (props.category === '编辑') {
      (async id => {
        const response = await window.fetch(`/api/common/user/${id}`)
        const res = await response.json()
        if (res.message) {
          window.alert(res.message)
          return
        }
        setName(res.content.name)
        setUsername(res.content.username)
        setPhone(res.content.phone)
        setDeptID(res.content.dept_id)
        setMasterID(res.content.master_id)
        setRemark(res.content.remark)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (dept_id === 0) return
    setDept2List([])
    ;(async dept_id => {
      const response = await window.fetch(`/api/common/dept/${dept_id}/sub/`)
      const res = await response.json()
      setDept2List(res.content)
    })(dept_id)
  }, [dept_id])

  const handleSave = async () => {
    if (!!!name || !!!username) {
      window.alert('请完整填写所需信息')
      return
    }
    const data = {
      name: name,
      username: username,
      password: md5('1234'),
      phone: phone,
      dept_id: dept_id,
      master_id: master_id,
      remark: remark
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common/user/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    } else if (props.category === '编辑') {
      const response = await window.fetch(`/api/common/user/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const res = await response.json()
      if (res.message) {
        window.alert(res.message)
        return
      }
      window.history.go(-1)
    }
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await window.fetch(`/api/common/user/${id}`, {
      method: 'DELETE'
    })
    const res = await response.json()
    if (res.message) {
      window.alert(res.message)
      return
    }
    window.history.go(-1)
  }

  return (
    <>
      <h2>{props.category} 用户</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="row">
            <div className="col-4 col-lg-3">
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
                <label>姓名</label>
                <input type="text" value={name || ''} autoComplete="name"
                  className="form-control"
                  onChange={event => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label>电话号码</label>
                <input type="tel" value={phone || ''} autoComplete="tel"
                  className="form-control"
                  onChange={event => setPhone(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <DeptPicker value={dept_id || '0'}
                onChange={event => setDeptID(parseInt(event.target.value))}
              />
            </div>

            {
              dept2_list.length > 0 && (
                <div className="col">
                  <Dept2Picker value={master_id || '0'} dept2_list={dept2_list}
                    onChange={event => setMasterID(event.target.value)}
                  />
                </div>
              )
            }
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
          <div className="btn-group">
            <button type="button" className="btn btn-outline-secondary"
              onClick={() => window.history.go(-1)}
            >
              返回
            </button>
          </div>

          <div className="btn-group pull-right">
            {
              props.category === '编辑' && (
                <button type="button" className="btn btn-outline-danger"
                  onClick={handleRemove}
                >
                  <i className="fa fa-fw fa-trash-o"></i>
                  删除
                </button>
              )
            }

            <button type="button" className="btn btn-primary"
              onClick={handleSave}
            >
              <i className="fa fa-fw fa-check"></i>
              保存
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
