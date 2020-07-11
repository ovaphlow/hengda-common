import React, { useEffect, useState } from 'react';

import IconAdd from '../icon/Add';
import IconList from '../icon/List';

export default function List() {
  const [dept_list, setDeptList] = useState([]);

  useEffect(() => {
    window.fetch('/api/setting/common/?category=车间')
      .then((response) => response.json())
      .then((data) => setDeptList(data.content));
  }, []);

  return (
    <>
      <h1>部门结构</h1>
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
        <div className="card-header"><p className="lead mb-0">车间</p></div>

        <div className="card-body">
          <div className="list-group">
            {dept_list.map((it) => (
              <a href={`#/${it.id}`} className="list-group-item list-group-item-action" key={it.id}>
                {it.v}
                <span className="float-right text-muted">
                  下属班组数量：
                  {it.qty}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
