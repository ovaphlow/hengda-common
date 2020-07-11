import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import IconList from '../icon/List';
import { TeamList } from './Component';

export default function Detail({ component_option }) {
  const { id } = useParams();
  const [v, setV] = useState('');
  const [remark, setRemark] = useState('');

  const handleSave = () => {
    const form = { v, remark };
    if (component_option === '新增') {
      window.fetch('/api/setting/common/?category=车间', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      }).then((response) => response.json).then((data) => {
        if (data.message) {
          window.alert(data.message);
          return;
        }
        window.history.go(-1);
      });
    } else if (component_option === '编辑') {
      window.fetch(`/api/setting/common/${id}`, {
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
    if (!window.confirm('确定要删除当前数据，并且同时删除该车间下属的所有班组？')) return;
    window.fetch(`/api/setting/common/${id}`, {
      method: 'DELETE',
    }).then((response) => response.json()).then((data) => {
      if (data.message) {
        window.alert(data.message);
        return;
      }
      window.history.go(-1);
    });
  };

  useEffect(() => {
    if (component_option === '编辑') {
      window.fetch(`/api/setting/common/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setV(data.content.v);
          setRemark(data.content.remark);
        });
    }
  // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>
        {component_option}
        {' '}
        部门结构
      </h1>
      <hr />

      <a href="#/" className="btn btn-outline-secondary float-right">
        <IconList />
        列表
      </a>

      <div className="clearfix m-2" />

      <div className="card shadow mt-2">
        <div className="card-body">
          <div className="mb-3">
            <label className="mb-3">名称</label>
            <input
              type="text"
              value={v || ''}
              className="form-control input-underscore"
              onChange={(event) => setV(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="mb-3">备注</label>
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
              <button type="button" className="btn btn-outline-danger" onClick={handleRemove}>
                删除
              </button>
            )}

            <button type="button" className="btn btn-primary" onClick={handleSave}>
              确定
            </button>
          </div>
        </div>
      </div>

      {component_option === '编辑' && (
        <TeamList dept_id={id} dept_name={v} />
      )}
    </div>
  );
}

Detail.propTypes = {
  component_option: PropTypes.string.isRequired,
};
