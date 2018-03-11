import React, { Component } from 'react';
import './index.css';


class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">UMAI Interest Calculator</h1>
        <ul>
          <li>
            <a href="">Simple Interest</a>
          </li>
          <li>
            <a href="">Complex Interest</a>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
