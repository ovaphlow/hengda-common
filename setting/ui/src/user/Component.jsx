import React from 'react';

import IconAdd from '../icon/Add';
import IconList from '../icon/List';

export function Toolbar() {
  return (
    <>
      <div className="btn-group">
        <a href="#/新增" className="btn btn-sm btn-outline-success">
          <IconAdd />
          新增
        </a>
      </div>

      <div className="btn-group float-right">
        <a href="#/" className="btn btn-sm btn-outline-secondary">
          <IconList />
          列表
        </a>
      </div>
    </>
  );
}
