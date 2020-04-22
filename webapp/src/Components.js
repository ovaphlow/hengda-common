import React, { useState, useEffect } from 'react'

export function Navbar() {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 mr-0" href="/">数据管理</a>

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#当前用户">
            <i className="fa fa-fw fa-user"></i>
            当前用户
          </a>
        </li>
      </ul>
    </nav>
  )
}

export function Sidebar() {
  return (
    <nav className="col-md-3 col-lg-2 d-none d-md-block bg-dark sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <h5 className="sidebar-heading d-flex px-3 m-1 text-muted">
            <i className="fa fa-fw fa-cogs"></i>
            数据管理
          </h5>

          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" href="#部门结构">
                <i className="fa fa-fw fa-sitemap"></i>
                部门结构
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#用户">
                <i className="fa fa-fw fa-users"></i>
                用户
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#车型">
                <i className="fa fa-fw fa-tags"></i>
                车型
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#车组">
                <i className="fa fa-fw fa-train"></i>
                车组
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#车次">
                <i className="fa fa-fw fa-anchor"></i>
                车次
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  )
}

export function DeptPicker(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/common/dept/`)
      const res = await response.json()
      setList(res.content)
    })()
  }, [])

  return (
    <div className="form-group">
      <label>{props.caption || '车间'}</label>
      <select value={props.value || ''}
        className="form-control"
        onChange={props.onChange}
      >
        <option value="0">未选择</option>
        {
          list.map(it => (
            <option value={it.id} key={it.id}>{it.v}</option>
          ))
        }
      </select>
    </div>
  )
}

export function Dept2Picker(props) {
  return (
    <div className="form-group">
      <label>{props.caption || '班组'}</label>
      <select value={props.value || ''}
        className="form-control"
        onChange={props.onChange}
      >
        <option value="0">未选择</option>
        {
          props.dept2_list.map(it => (
            <option value={it.id} key={it.id}>{it.v}</option>
          ))
        }
      </select>
    </div>
  )
}

export function ModelPicker(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await window.fetch(`/api/common/model/`)
      const res = await response.json()
      setData(res.content)
    })()
  }, [])

  return (
    <div className="form-group">
      <label>车型</label>
      <select value={props.value || '0'}
        className="form-control"
        onChange={props.onChange}
      >
        <option value="0">未选择</option>
        {
          data.map(it => (
            <option value={it.id} key={it.id}>{it.v}</option>
          ))
        }
      </select>
    </div>
  )
}
