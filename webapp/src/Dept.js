import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route, useParams } from 'react-router-dom'

import { ListComponent as Dept2ListComponent } from './Dept2'

export default function DeptRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/部门结构"><List /></Route>
        <Route exact path="/部门结构/新增"><Detail category="新增" /></Route>
        <Route exact path="/部门结构/:id"><Detail category="编辑" /></Route>
        <Route exact path="/部门结构/:id/新增"><Detail category="新增班组" /></Route>
      </Switch>
    </Router>
  )
}

function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#部门结构/新增" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href="#部门结构" className="btn btn-sm btn-outline-secondary">
          <i className="fa fa-fw fa-list"></i>
          列表
        </a>
      </div>
    </>
  )
}

function ToolbarSub(props) {
  return (
    <>
      <div className="btn-group">
        <a href={`#部门结构/${props.item.id}/新增`} className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>
    </>
  )
}

function List() {
  const [dept_list, setDeptList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/common/dept`)
      const result = await response.json()
      setDeptList(result.content)
    })()
  }, [])

  return (
    <>
      <h1>部门结构</h1>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-header"><p className="lead mb-0">车间</p></div>

        <div className="card-body">
          <div className="list-group">
            {
              dept_list.map(it => (
                <a href={`#部门结构/${it.id}`} className="list-group-item list-group-item-action" key={it.id}>
                  {it.v}
                  <span className="pull-right text-muted">
                    下属班组数量：{it.qty}
                  </span>
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

function Detail(props) {
  const { id } = useParams()
  const [v, setV] = useState('')
  const [remark, setRemark] = useState('')

  useEffect(() => {
    if (props.category === '编辑') {
      ;(async id => {
        const response = await window.fetch(`/api/common/dept/${id}`)
        const res = await response.json()
        if (res.message) {
          window.alert(res.message)
          return
        }
        setV(res.content.v)
        setRemark(res.content.remark)
      })(id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    const data = {
      v: v,
      remark: remark
    }
    if (props.category === '新增') {
      const response = await window.fetch(`/api/common/dept/`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
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
    if (!!!window.confirm('确定要删除当前数据，并且同时删除该车间下属的所有班组？')) return
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
      <h1>{props.category} 部门结构</h1>
      <hr />

      <Toolbar />

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

      {
        props.category === '编辑' && (
          <Dept2ListComponent dept_id={id} dept_name={v} />
        )
      }
    </>
  )
}

export function Update() {
  const [item, setItem] = React.useState(0)
  const [list, setList] = React.useState([])
  const { id } = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await window.fetch(`/api/common/dept/${id}`)
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
        return
      }
      setItem(result.content)
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await window.fetch(`/api/common/dept/${id}/sub`)
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
        return
      }
      setList(result.content)
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    const response = await window.fetch(`/api/common/dept/:id`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const result = await response.json()
    if (result.message) {
      window.alert(result.message)
      return
    }
    handleBack()
  }

  const handleDetail = event => {
    window.location = `#部门结构/${event.target.getAttribute('data-id')}`
    window.location.reload(true)
  }

  const handleBack = () => {
    if (!!!item.master_id) {
      window.location = '#部门结构'
    } else {
      window.location = `#部门结构/${item.master_id}`
      window.location.reload(true)
    }
  }

  return (
    <>
      <h2>部门结构 - {item.v}</h2>
      <hr />

      <div className="card shadow mb-3">
        <div className="card-body">
          <div className="form-group">
            <label>名称</label>
            <input type="text" name="v" value={item.v || ''}
                className="form-control"
                onChange={handleChange}
            />
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
          {
            item.master_id > 0 && (
              <div className="btn-group">
                <button type="button" className="btn btn-secondary" onClick={handleBack}>
                  返回
                </button>
              </div>
            )
          }

          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>

      <hr />

      <ToolbarSub item={item} />

      <div className="card shadow mt-2">
        <div className="card-header">
          <span className="lead text-muted">
            下属部门
          </span>
        </div>

        <div className="card-body">
          <ul className="list-group">
            {
              list.map(it => (
                <li className="list-group-item list-group-item-action" data-id={it.id} key={it.id} onClick={handleDetail}>
                  {it.v}
                  <span className="pull-right text-muted" data-id={it.id}>
                    下属部门数量：{it.qty || 0}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}
