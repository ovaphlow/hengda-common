import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSitemap,
  faTags,
  faTrain,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

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

      <div className="container-lg mt-5">
        <div class="row row-cols-3 g-4">
          <div className="col">
            <div className="card shadow h-100">
              <div className="card-body">
                <h2 className="text-center text-primary">
                  <FontAwesomeIcon icon={faSitemap} fixedWidth size="3x" />
                  <hr />
                  车间 / 班组
                </h2>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow h-100">
              <div className="card-body">
                <h2 className="text-center text-primary">
                  <FontAwesomeIcon icon={faUsers} fixedWidth size="3x" />
                  <hr />
                  用户
                </h2>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow h-100">
              <div className="card-body">
                <h2 className="text-center text-primary">
                  <FontAwesomeIcon icon={faTags} fixedWidth size="3x" />
                  <hr />
                  车型
                </h2>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card shadow h-100">
              <div className="card-body">
                <h2 className="text-center text-primary">
                  <FontAwesomeIcon icon={faTrain} fixedWidth size="3x" />
                  <hr />
                  车组
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
