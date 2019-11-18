import React from 'react'

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
              <a className="nav-link" href="#车组">
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
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/common/dept/sub/`)
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
        return
      }
      setList(result.content)
    }
    fetchData()
  }, [])

  return (
    <div className="form-group">
      <label>部门</label>
      <select name={props.name || 'dept_id'} value={props.value || ''}
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

export function ModelPicker(props) {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/common/model/`)
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
        return
      }
      setData(result.content)
    }
    fetchData()
  }, [])

  return (
    <div className="form-group">
      <label>车型</label>
      <select name={props.name || 'model_id'} value={props.value || ''}
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
