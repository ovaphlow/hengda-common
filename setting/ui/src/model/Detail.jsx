import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import IconAdd from '../icon/Add';
import IconList from '../icon/List';

export default function Detail({ component_option }) {
  const { id } = useParams();
  const [v, setV] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    if (component_option === '编辑') {
      (async () => {
        const response = await window.fetch(`/api/common/model/${id}`);
        const res = await response.json();
        setV(res.content.v);
        setRemark(res.content.remark);
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!v) {
      window.alert('请完整填写所需信息');
      return;
    }
    const data = { v, remark };
    if (component_option === '新增') {
      const response = await window.fetch('/api/common/model/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    } else if (component_option === '编辑') {
      const response = await window.fetch(`/api/common/model/${id}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.message) {
        window.alert(res.message);
        return;
      }
      window.history.go(-1);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('确定要删除当前数据？')) return;
    const response = await window.fetch(`/api/common/model/${id}`, {
      method: 'DELETE',
    });
    const res = await response.json();
    if (res.message) {
      window.alert(res.message);
      return;
    }
    window.history.go(-1);
  };

  return (
    <>
      <h2>
        {component_option}
        {' '}
        车型
      </h2>
      <hr />

      <div className="row">
        <div className="col">
          <a href="#/新增" className="btn btn-outline-success">
            <IconAdd />
            新增
          </a>
        </div>

        <div className="col">
          <div className="btn-group float-right">
            <a href="#/" className="btn btn-outline-secondary">
              <IconList />
              列表
            </a>
          </div>
        </div>
      </div>

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">名称</label>
            <input
              type="text"
              value={v}
              className="form-control"
              onChange={(event) => setV(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">备注</label>
            <input
              type="text"
              value={remark}
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

            <button type="button" className="btn btn-primary" onClick={handleSave}>
              确定
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
