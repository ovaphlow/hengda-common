/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import IconProfile from './icon/Profile';

export function Navbar() {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a href="/" className="navbar-brand col-md-3 col-lg-2 mr-0 pl-3 lead">数据管理</a>

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#当前用户">
            <IconProfile />
            当前用户
          </a>
        </li>
      </ul>
    </nav>
  );
}

export function Sidebar() {
  return (
    <nav className="col-md-3 col-lg-2 d-none d-md-block bg-dark sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <h5 className="sidebar-heading d-flex px-3 m-1 text-muted">
            数据管理
          </h5>

          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a href="dept.html" className="nav-link">
                部门结构
              </a>
            </li>

            <li className="nav-item">
              <a href="user.html" className="nav-link">
                用户
              </a>
            </li>

            <li className="nav-item">
              <a href="model.html" className="nav-link">
                车型
              </a>
            </li>

            <li className="nav-item">
              <a href="train.html" className="nav-link">
                车组
              </a>
            </li>

            <li className="nav-item">
              <a href="route.html" className="nav-link">
                车次
              </a>
            </li>
          </ul>
        </ul>
      </div>
    </nav>
  );
}

export function DeptPicker({ caption, value, onChange }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/common/dept/');
      const res = await response.json();
      setList(res.content);
    })();
  }, []);

  return (
    <div className="mb-3">
      <label className="form-label">{caption || '车间'}</label>
      <select
        value={value}
        className="form-control"
        onChange={onChange}
      >
        <option value="0">未选择</option>
        {list.map((it) => (
          <option value={it.id} key={it.id}>{it.v}</option>
        ))}
      </select>
    </div>
  );
}

DeptPicker.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function Dept2Picker({
  caption, value, onChange, dept2_list,
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{caption || '班组'}</label>
      <select
        value={value}
        className="form-control"
        onChange={onChange}
      >
        <option value="0">未选择</option>
        {dept2_list.map((it) => (
          <option value={it.id} key={it.id}>{it.v}</option>
        ))}
      </select>
    </div>
  );
}

Dept2Picker.propTypes = {
  caption: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  dept2_list: PropTypes.array.isRequired,
};

export function ModelPicker({ value, onChange }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/common/model/');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <div className="mb-3">
      <label className="form-label">车型</label>
      <select
        value={value}
        className="form-control"
        onChange={onChange}
      >
        <option value="0">未选择</option>
        {data.map((it) => (
          <option value={it.id} key={it.id}>{it.v}</option>
        ))}
      </select>
    </div>
  );
}

ModelPicker.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
