import React from 'react'
import { useParams } from 'react-router-dom'

function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#车型/新增" className="btn btn-sm btn-outline-success">
          <i className="fa fa-fw fa-plus"></i>
          新增
        </a>
      </div>

      <div className="btn-group pull-right">
        <a href="#车型" className="btn btn-sm btn-outline-secondary">
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
      <div className="form-group">
        <label>名称</label>
        <input type="text" name="v" value={props.data.v || ''}
            className="form-control"
            onChange={props.handleChange}
        />
      </div>

      <div className="form-group">
        <label>备注</label>
        <input type="text" name="remark" value={props.data.remark || ''}
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
      const response = await fetch(`/api/common/model/`)
      const result = await response.json()
      setData(result.content)
    }
    fetchData()
  }, [])

  return (
    <>
      <h2>车型</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>序号</th>
                <th>名称</th>
                <th>备注</th>
              </tr>
            </thead>

            <tbody>
              {
                data.map(it => (
                  <tr key={it.id}>
                    <td>
                      <a href={`#车型/${it.id}`}>
                        <i className="fa fa-fw fa-edit"></i>
                      </a>

                      <span className="pull-right">{it.id}</span>
                    </td>
                    <td>{it.v}</td>
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

export const Save = () => {
  const [data, setData] = React.useState({
    v: '',
    remark: ''
  })

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!!!data.v) {
      window.alert('请完整填写所需信息')
      return
    }
    const response = await fetch(`/api/common/model/`, {
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
    window.location = '#车型'
  }

  return (
    <>
      <h2>车型 - 新增</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <Form data={data} handleChange={handleChange} />
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
  const [data, setData] = React.useState(0)

  React.useEffect(() => {
    const fetchData = async id => {
      const response = await fetch(`/api/common/model/${id}`)
      const result = await response.json()
      if (result.message) {
        window.alert(result.message)
        return
      }
      setData(result.content)
      console.info(result)
    }
    fetchData(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = e => {
    const { value, name } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleRemove = async () => {
    if (!!!window.confirm('确定要删除当前数据？')) return
    const response = await fetch(`/api/common/model/${id}`, {method: 'DELETE'})
    const result = await response.json()
    if (result.message) {
      window.alert(result.message)
      return
    }
    window.location = '#车型'
  }

  const handleUpdate = async () => {
    const response = await fetch(`/api/common/model/${id}`, {
      method: 'PUT',
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
    window.location = '#车型'
  }

  return (
    <>
      <h2>车型 - 新增</h2>
      <hr />

      <Toolbar />

      <div className="card shadow mt-2">
        <div className="card-body">
          <Form data={data} handleChange={handleChange} />
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
