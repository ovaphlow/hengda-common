import React from 'react'
import { useParams } from 'react-router-dom'
import md5 from 'blueimp-md5'

import { DeptPicker } from './Components'

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

function Form(props) {
  return (
    <>
      <div className="row">
        <div className="col-4 col-lg-3">
          <div className="form-group">
            <label>用户名</label>
            <input type="text" name="username" value={props.item.username || ''}
                className="form-control"
                onChange={props.handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>姓名</label>
            <input type="text" name="name" value={props.item.name || ''}
                className="form-control"
                onChange={props.handleChange}
            />
          </div>
        </div>

        <div className="col">
          <div className="form-group">
            <label>电话号码</label>
            <input type="text" name="phone" value={props.item.phone || ''}
                className="form-control"
                onChange={props.handleChange}
            />
          </div>
        </div>

        {/* 替换 */}
        <div className="col">
          <DeptPicker name="master_id" value={props.item.master_id || ''} onChange={props.handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>备注</label>
        <input type="text" name="remark" value={props.item.remark || ''}
            className="form-control"
            onChange={props.handleChange}
        />
      </div>
    </>
  )
}

export function List() {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/common/user/`)
      const result = await response.json()
      setData(result.content)
    }
    fetchData()
  }, [])

  return (
    <>
      <h2>用户</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>序号</th>
                <th>姓名</th>
                <th>用户名</th>
                <th>电话号码</th>
                <th>部门</th>
                <th>管理员</th>
              </tr>
            </thead>

            <tbody>
              {
                data.map(it => (
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

export function Save() {
  const [item, setItem] = React.useState({
    name: '',
    username: '',
    password: md5('1234'),
    phone: '',
    master_id: '0',
    remark: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!!!item.name || !!!item.username || !!!item.master_id) {
      window.alert('请完整填写所需信息')
      return
    }
    const response = await fetch(`/api/common/user`, {
      method: 'POST',
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
    window.location = '#用户'
  }

  return (
    <>
      <h2>用户 - 新增</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <Form item={item} handleChange={handleChange} />
        </div>

        <div className="card-footer">
          <div className="btn-group pull-right">
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

export function Update() {
  const { id } = useParams()
  const [item, setItem] = React.useState(0)

  React.useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/common/user/${id}`)
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
        return
      }
      setItem(result.content)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await fetch(`/api/common/user/${item.id}`, {method: 'DELETE'})
    const result = await response.json()
    if (result.message) {
      window.alert(result.message)
      return
    }
    window.location = '#用户'
  }

  const handleUpdate = async () => {
    if (!!!item.name || !!!item.username || !!!item.master_id) {
      window.alert('请完整填写所需信息')
      return
    }
    const response = await fetch(`/api/common/user/${item.id}`, {
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
    window.location = '#用户'
  }

  return (
    <>
      <h2>用户 - 编辑</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <Form item={item} handleChange={handleChange} />
        </div>

        <div className="card-footer">
          <div className="btn-group">
            <button type="button" className="btn btn-danger" onClick={handleRemove}>
              删除
            </button>
          </div>

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
