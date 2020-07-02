import React, { useEffect, useState } from 'react';

import IconAdd from '../icon/Add';
import IconList from '../icon/List';
import IconRename from '../icon/Rename';

export default function List() {
  const [user_list, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await window.fetch('/api/common/user/');
      const result = await response.json();
      setUserList(result.content);
    })();
  }, []);

  return (
    <>
      <h2>用户</h2>
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
        <div className="card-body table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="text-right">序号</th>
                <th>姓名</th>
                <th>用户名</th>
                <th>电话号码</th>
                <th>车间</th>
                <th>班组</th>
                <th>管理员</th>
              </tr>
            </thead>

            <tbody>
              {user_list.map((it) => (
                <tr key={it.id}>
                  <td className="text-right">
                    <a href={`#/${it.id}`} className="float-left">
                      <IconRename />
                    </a>
                    {it.id}
                  </td>
                  <td>{it.name}</td>
                  <td>{it.username}</td>
                  <td>{it.phone}</td>
                  <td>{it.dept}</td>
                  <td>{it.dept2}</td>
                  <td>{it.super === 1 ? '是' : '否'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
