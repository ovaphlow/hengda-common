import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          恒达交通
        </a>

        <div className="mr-auto" />

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Link
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
