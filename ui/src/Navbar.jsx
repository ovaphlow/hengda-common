import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCogs,
  faEnvelope,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

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
            <a className="nav-link" href="/">
              <FontAwesomeIcon icon={faHome} fixedWidth />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/setting">
              <FontAwesomeIcon icon={faCogs} fixedWidth />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/message">
              <FontAwesomeIcon icon={faEnvelope} fixedWidth />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/user">
              <FontAwesomeIcon icon={faUserCircle} fixedWidth />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
