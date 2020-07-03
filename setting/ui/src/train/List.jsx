import React, { useEffect, useState } from 'react';

import IconAdd from '../icon/Add';
import IconList from '../icon/List';
import IconRename from '../icon/Rename';

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/common/train/');
      const res = await response.json();
      setData(res.content);
    })();
  }, []);

  return (
    <>
      <h2>车组</h2>
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
          <table className="table">
            <caption>车组</caption>
            <thead>
              <tr>
                <th className="text-right">序号</th>
                <th>名称</th>
                <th>车型</th>
                <th>备注</th>
              </tr>
            </thead>

            <tbody>
              {data.map((it) => (
                <tr key={it.id}>
                  <td className="text-right">
                    <a href={`#/${it.id}`} className="float-left">
                      <IconRename />
                    </a>
                    {it.id}
                  </td>
                  <td>{it.name}</td>
                  <td>{it.model}</td>
                  <td>{it.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
