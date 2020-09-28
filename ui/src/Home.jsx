import React from 'react';

export default function Home() {
  return (
    <>
      <div className="page-title">
        <div className="row">
          <div className="col">
            <h1>系统设置</h1>
          </div>

          <div className="col-auto text-right">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/" className="text-decoration-none">
                    首页
                  </a>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  系统设置
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
