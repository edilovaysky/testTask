import './MainMenu.scss';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class MainMenu extends Component {
  render() {
    return (
      <div className="main-menu-wrap">
        <ul className="main-menu">
          <li>
            <Link to="/home">
              <p>главная</p>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
