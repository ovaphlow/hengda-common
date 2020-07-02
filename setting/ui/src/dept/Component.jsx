import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import IconAdd from '../icon/Add';
import IconList from '../icon/List';
import IconTag from '../icon/Tag';

export function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#/新增" className="btn btn-outline-success">
          <IconAdd />
          新增
        </a>
      </div>

      <div className="btn-group float-right">
        <a href="#/" className="btn btn-outline-secondary">
          <IconList />
          列表
        </a>
      </div>
    </>
  );
}

export function ToolbarSub({ item }) {
  return (
    <>
      <div className="btn-group">
        <a href={`#/${item.id}/新增`} className="btn btn-sm btn-outline-success">
          <IconAdd />
          新增
        </a>
      </div>
    </>
  );
}

ToolbarSub.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object.isRequired,
};

export function TeamList({ dept_id, dept_name }) {
  const [dept2_list, setDept2List] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch(`/api/common/dept/${dept_id}/sub/`);
      const res = await response.json();
      setDept2List(res.content);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card shadow mt-3">
      <div className="card-header">
        <span className="lead text-muted">
          下属班组
        </span>

        <div className="btn-group float-right">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => { window.location = `#班组/新增?dept_id=${dept_id}&dept_name=${dept_name}`; }}
          >
            <IconAdd />
            新增班组
          </button>
        </div>
      </div>

      <div className="card-body">
        <ul className="list-inline">
          {dept2_list.map((it) => (
            <li className="list-inline-item" key={it.id}>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => { window.location = `#班组/${it.id}?dept_id=${dept_id}&dept_name=${dept_name}`; }}
              >
                <IconTag />
                {it.v}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

TeamList.propTypes = {
  dept_id: PropTypes.string.isRequired,
  dept_name: PropTypes.string.isRequired,
};
