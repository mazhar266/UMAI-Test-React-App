import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './index.css';


class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">UMAI Interest Calculator</h1>
        <ul>
          <li>
            <Link to={`/`}>Simple Interest</Link>
          </li>
          <li>
            <Link to={`/complex`}>Complex Interest</Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
