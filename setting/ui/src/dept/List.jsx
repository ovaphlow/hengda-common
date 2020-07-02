import React, { useEffect, useState } from 'react';

import { Toolbar } from './Component';

export default function List() {
  const [dept_list, setDeptList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/common/dept');
      const result = await response.json();
      setDeptList(result.content);
    })();
  }, []);

  return (
    <>
      <h1>部门结构</h1>
      <hr />

      <Toolbar />

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
