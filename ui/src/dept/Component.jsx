import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import IconAdd from '../icon/Add';
import IconTag from '../icon/Tag';

// eslint-disable-next-line import/prefer-default-export
export function TeamList({ dept_id, dept_name }) {
  const [dept2_list, setDept2List] = useState([]);

  useEffect(() => {
    window.fetch(`/api/setting/common/${dept_id}/sub/`)
      .then((response) => response.json())
      .then((data) => setDept2List(data.content));
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
