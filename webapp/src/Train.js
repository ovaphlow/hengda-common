import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import { ModelPicker } from './Components'

export default function DeptRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/车组"><List /></Route>
        <Route path="/车组/新增"><Detail category="新增" /></Route>
        <Route path="/车组/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href={`#车组/新增`} className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href={`#车组`} className="btn btn-sm btn-outline-secondary">
          <i className="fa fa-fw fa-list"></i>
          列表
        </a>
      </div>
    </>
  )
}

function List() {
  const [data, setData] = React.useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/common/train/`)
      const res = await response.json()
      setData(res.content)
    })()
  }, [])

  return (
    <>
      <h2>车组</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="text-right">序号</th>
                <th>名称</th>
                <th>车型</th>
                <th>备注</th>
              </tr>
            </thead>

            <tbody>
              {
                data.map(it => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#车组/${it.id}`}>
                        <i className="fa fa-fw fa-edit"></i>
                      </a>
                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>{it.name}</td>
                    <td>{it.model}</td>
                    <td>{it.remark}</td>
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
  const [master_id, setMasterID] = useState(0)
  const [remark, setRemark] = useState('')
  
  useEffect(() => {
    if (props.category === '编辑') {
      ;(async id => {
        const response = await window.fetch(`/api/common/train/${id}`)
        const res = await response.json()
        setName(res.content.name)
        setMasterID(res.content.master_id)
        setRemark(res.content.remark)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (!!!name || !!!master_id) {
      window.alert('请完整填写所需信息')
      return
    }
    const data = {
      name: name,
      master_id: master_id,
      remark: remark
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common/train/`, {
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
      const response = await window.fetch(`/api/common/train/${id}`, {
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
    const response = await window.fetch(`/api/common/train/${id}`, {
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
      <h2>{props.category} 车组</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>名称</label>
                <input type="text" value={name || ''}
                  className="form-control"
                  onChange={event => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <ModelPicker value={master_id || '0'} onChange={event => setMasterID(event.target.value)} />
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

            <button type="button" className="btn btn-primary" onClick={handleSave} >
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
