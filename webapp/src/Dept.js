import React from 'react'
import { useParams } from 'react-router-dom'

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

export function List() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/common/dept`)
      const result = await response.json()
      setData(result.content)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>部门结构</h1>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="list-group">
            {
              data.map(it => (
                <a href={`#部门结构/${it.id}`} className="list-group-item list-group-item-action" key={it.id}>
                  {it.v}
                  <span className="pull-right text-muted">
                    下属部门数量：{it.qty}
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

export function Save() {
  const { id } = useParams()
  const [master, setMaster] = React.useState(0)
  const [data, setData] = React.useState({
    v: '',
    remark: ''
  })

  React.useEffect(() => {
    if (!!!id) return
    const fetchData = async id => {
      const response = await fetch(`/api/common/dept/${id}`)
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
        return
      }
      setMaster(result.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    const response = await fetch(`/api/common/dept/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    if (result.message) {
      window.alert(result.message)
      return
    }
    window.location = '#部门结构'
  }

  const handleSaveSub = async () => {
    const response = await fetch(`/api/common/dept/${master.id}/sub`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    if (result.message) {
      window.alert(result.message)
      return
    }
    window.location = `#部门结构/${master.id}`
  }

  return (
    <>
      <h1>
        部门结构 - 新增
        {
          id > 0 && (
            <span className="pull-right text-muted">{master.v}</span>
          )
        }
      </h1>
      <hr />

      {
        !!!id && <Toolbar />
      }

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="form-group">
            <label>名称</label>
            <input type="text" name="v" value={data.v}
                className="form-control"
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>备注</label>
            <input type="text" name="remark" value={data.remark}
                className="form-control"
                onChange={handleChange}
            />
          </div>
        </div>

        <div className="card-footer">
          {
            id > 0 && (
              <div className="btn-group">
                <a href={`#部门结构/${master.id}`} className="btn btn-secondary">
                  返回
                </a>
              </div>
            )
          }

          <div className="btn-group pull-right">
            <button type="button" className="btn btn-primary" onClick={id > 0 ? handleSaveSub : handleSave}>
              <i className="fa fa-fw fa-check"></i>
              确定
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export function Update() {
  const [item, setItem] = React.useState(0)
  const [list, setList] = React.useState([])
  const { id } = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/common/dept/${id}`)
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
      const response = await fetch(`/api/common/dept/${id}/sub`)
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
    const response = await fetch(`/api/common/dept/:id`, {
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
