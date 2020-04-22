import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams, useLocation } from 'react-router-dom'

export default function Dept2Router() {
  return (
    <Router>
      <Switch>
        <Route exact path="/班组/新增"><Detail category="新增" /></Route>
        <Route exact path="/班组/:id"><Detail category="编辑" /></Route>
      </Switch>
    </Router>
  )
}

export function ListComponent(props) {
  const [dept2_list, setDept2List] = useState([])

  useEffect(() => {
    ;(async dept_id => {
      const response = await window.fetch(`/api/common/dept/${dept_id}/sub/`)
      const res = await response.json()
      setDept2List(res.content)
    })(props.dept_id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="card shadow mt-3">
      <div className="card-header">
        <span className="lead text-muted">
          下属班组
        </span>

        <div className="btn-group pull-right">
          <button type="button" className="btn btn-link"
            onClick={() => window.location = `#班组/新增?dept_id=${props.dept_id}&dept_name=${props.dept_name}`}
          >
            <i className="fa fa-fw fa-plus"></i>
            新增班组
          </button>
        </div>
      </div>

      <div className="card-body">
        <ul className="list-inline">
          {
            dept2_list.map(it => (
              <li className="list-inline-item" key={it.id}>
                <button type="button" className="btn btn-link"
                  onClick={() => window.location = `#班组/${it.id}?dept_id=${props.dept_id}&dept_name=${props.dept_name}`}
                >
                  <i className="fa fa-fw fa-tag"></i>
                  {it.v}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

function Detail(props) {
  const { id } = useParams()
  const location = useLocation()
  const [dept_id, setDeptID] = useState(0)
  const [dept_name, setDeptName] = useState('')
  const [v, setV] = useState('')
  const [remark, setRemark] = useState('')

  useEffect(() => {
    const _dept_id = new URLSearchParams(location.search).get('dept_id')
    setDeptID(_dept_id)
    const _dept_name = new URLSearchParams(location.search).get('dept_name')
    setDeptName(_dept_name)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ;(async id => {
      const response = await window.fetch(`/api/common/dept/${id}`)
      const res = await response.json()
      setV(res.content.v)
      setRemark(res.content.remark)
    })(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (!!!v) {
      window.alert('请完整填写所需信息')
      return
    }
    const data = {
      v: v,
      remark: remark
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common/dept/${dept_id}/sub`, {
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
      const response = await window.fetch(`/api/common/dept/${id}`, {
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
    const response = await window.fetch(`/api/common/dept/${id}`, {
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
      <h1>
        {props.category} 班组
        <span className="text-muted pull-right">{dept_name}</span>
      </h1>
      <hr />

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="form-group">
            <label>名称</label>
            <input type="text" value={v || ''}
              className="form-control"
              onChange={event => setV(event.target.value)}
            />
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

            <button type="button" className="btn btn-primary" onClick={handleSave}>
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
