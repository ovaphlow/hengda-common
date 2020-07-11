import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'blueimp-md5';

import { DeptPicker, Dept2Picker } from '../Component';
import IconList from '../icon/List';

export default function Detail({ component_option }) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [dept_id, setDeptID] = useState(0);
  const [master_id, setMasterID] = useState(0);
  const [remark, setRemark] = useState('');
  const [dept2_list, setDept2List] = useState([]);

  useEffect(() => {
    if (component_option !== '编辑') return;
    window.fetch(`/api/setting/user/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.content.name);
        setUsername(data.content.username);
        setPhone(data.content.phone);
        setDeptID(parseInt(data.content.dept_id, 10));
        setMasterID(parseInt(data.content.master_id, 10));
        setRemark(data.content.remark);
      });
  }, []);

  useEffect(() => {
    if (!dept_id) return;
    setDept2List([]);
    window.fetch(`/api/setting/common/${dept_id}/sub/`)
      .then((response) => response.json())
      .then((data) => setDept2List(data.content));
  }, [dept_id]);

  const handleSave = () => {
    if (!name || !username) {
      window.alert('请完整填写所需信息');
      return;
    }
    const form = {
      name,
      username,
      password: md5('1234'),
      phone,
      dept_id,
      master_id,
      remark,
      super: 0,
    };
    if (component_option === '新增') {
      window.fetch('/api/setting/user/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      }).then((response) => response.json()).then((data) => {
        if (data.message) {
          window.alert(data.message);
          return;
        }
        window.history.go(-1);
      });
    } else if (component_option === '编辑') {
      window.fetch(`/api/setting/user/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      }).then((response) => response.json()).then((data) => {
        if (data.message) {
          window.alert(data.message);
          return;
        }
        window.history.go(-1);
      });
    }
  };

  const handleRemove = () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    window.fetch(`/api/setting/user/${id}`, {
      method: 'DELETE',
    }).then((response) => response.json()).then((data) => {
      if (data.message) {
        window.alert(data.message);
        return;
      }
      window.history.go(-1);
    });
  };

  return (
    <>
      <h2>
        {component_option}
        {' '}
        用户
      </h2>
      <hr />

      <a href="#/" className="btn btn-outline-secondary float-right">
        <IconList />
        列表
      </a>
      <div className="clearfix m-2" />

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="row">
            <div className="col-4 col-lg-3">
              <div className="mb-3">
                <label className="form-label">用户名</label>
                <input
                  type="text"
                  value={username || ''}
                  className="form-control"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">姓名</label>
                <input
                  type="text"
                  value={name || ''}
                  className="form-control"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">电话号码</label>
                <input
                  type="tel"
                  value={phone || ''}
                  className="form-control"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>

            <div className="col">
              <DeptPicker
                caption=""
                value={dept_id}
                onChange={(event) => setDeptID(parseInt(event.target.value, 10))}
              />
            </div>

            {dept2_list.length > 0 && (
              <div className="col">
                <Dept2Picker
                  caption=""
                  value={master_id}
                  dept2_list={dept2_list}
                  onChange={(event) => setMasterID(parseInt(event.target.value, 10))}
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">备注</label>
            <input
              type="text"
              value={remark || ''}
              className="form-control"
              onChange={(event) => setRemark(event.target.value)}
            />
          </div>

        </div>

        <div className="card-footer">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => window.history.go(-1)}
            >
              返回
            </button>
          </div>

          <div className="btn-group float-right">
            {component_option === '编辑' && (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleRemove}
              >
                删除
              </button>
            )}

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
