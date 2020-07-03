import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function TeamDetail({ component_option }) {
  const { id } = useParams();
  const location = useLocation();
  const [dept_id, setDeptID] = useState(0);
  const [dept_name, setDeptName] = useState('');
  const [v, setV] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    setDeptID(new URLSearchParams(location.search).get('dept_id'));
    setDeptName(new URLSearchParams(location.search).get('dept_name'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/common/dept/${id}`);
      const res = await response.json();
      setV(res.content.v);
      setRemark(res.content.remark);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    if (!v) {
      window.alert('请完整填写所需信息');
      return;
    }
    const data = {
      v,
      remark,
    };
    if (component_option === '新增') {
      const response = await window.fetch(`/api/common/dept/${dept_id}/sub`, {
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
      const response = await window.fetch(`/api/common/dept/${id}`, {
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
    const response = await window.fetch(`/api/common/dept/${id}`, {
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
      <h1>
        {component_option}
        {' '}
        班组
        <span className="text-muted pull-right">{dept_name}</span>
      </h1>
      <hr />

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">名称</label>
            <input
              type="text"
              value={v || ''}
              className="form-control"
              onChange={(event) => setV(event.target.value)}
            />
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

            <button type="button" className="btn btn-primary" onClick={handleSave}>
              确定
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

TeamDetail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
